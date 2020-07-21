'use strict';

var multer = require('multer')

const nconf = require.main.require('nconf');
const validator = require.main.require('validator');
const benchpressjs = require.main.require('benchpressjs');
const _ = require.main.require('lodash');

const db = require.main.require('./src/database');
const categories = require.main.require('./src/categories');
const user = require.main.require('./src/user');
const plugins = require.main.require('./src/plugins');
const topics = require.main.require('./src/topics');
const posts = require.main.require('./src/posts');
const groups = require.main.require('./src/groups');
const utils = require.main.require('./src/utils');
const emailer = require.main.require('./src/emailer');
const meta = require.main.require('./src/meta');
const upload = require.main.require('./src/controllers/uploads');

let app;

const Widget = module.exports;

//contact page
const ContactPage = {};
Widget.init = async function(params) {
    app = params.app;
    let router = params.router;
    let middleware = params.middleware;

    router.get('/contact', middleware.buildHeader, renderContact);
    router.get('/api/contact', renderContact);
    router.post('/contact', multer().single('file'), postContact);

    // admin panel
    router.get('/admin/plugins/contact-page', middleware.admin.buildHeader, renderAdmin);
    router.get('/api/admin/plugins/contact-page', renderAdmin);

    meta.settings.get('contactpage', (err, options) => {
        if (err) {
            winston.warn(`[plugin/contactpage] Unable to retrieve settings, will keep defaults: ${err.message}`);
        } else {
            // load setting from config if exist
            for (let settingName of["reCaptchaPubKey", "reCaptchaPrivKey", "contactEmail", "messageFooter"]) {
                if (options.hasOwnProperty(settingName)) {
                    ContactPage[settingName] = options[settingName];
                }
            }
        }
    });
};
Widget.getConfig = function(config, callback) {
    config.contactpage = {
        reCaptchaPubKey: ContactPage.reCaptchaPubKey
    };
    callback(null, config);
}
Widget.addToAdminNav = function(header, callback) {
    header.plugins.push({
        route: '/plugins/contact-page',
        name: 'Contact page',
    });

    callback(null, header);
}
Widget.modifyEmail = function(mailData, callback) {
    if (mailData && mailData.template == "contact-page") {
        mailData = modifyFrom(mailData);
    }
    callback(null, mailData);
}

function renderContact(req, res) {
    return res.render('contact', {
        recaptcha: ContactPage.reCaptchaPubKey,
        title: "Contact"
    });
}

async function postContact(req, res) {
    console.log('body', JSON.stringify(req.body, null, '\t'))
    console.log('file', JSON.stringify(req.file, null, '\t'))

    if (!req.body.email || !req.body.name || !req.body.subject || !req.body.message) {
        return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete]]' });
    }

    // let files = req.files.files;
    // if (!Array.isArray(files)) {
    //     return res.status(500).json('invalid files');
    // }
    // if (Array.isArray(files[0])) {
    //     files = files[0];
    // }
    let files = [];

    const fileObj = files.length ? await uploadsController.uploadFile(req.uid, files[0]) : {};

    if (ContactPage.reCaptchaPubKey) {
        if (!req.body['g-recaptcha-response']) {
            return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete.recaptcha]]' });
        }
        simpleRecaptcha(ContactPage.reCaptchaPrivKey, req.ip, req.body['g-recaptcha-response'], (err) => {
            if (err) {
                return res.status(400).json({ success: false, msg: '[[contactpage:error.invalid.recaptcha]]' });
            } else {
                sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, fileObj, res);
            }
        });
    } else {
        sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, fileObj, res);
    }
}

function sendMail(replyTo, name, subject, message, fileObj, res) {
    let mailParams = {
        content_text: message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        fileObj,
        footer_text: ContactPage.messageFooter,
        from_name: name,
        subject: subject,
        template: 'contact-page',
        uid: 0,
        replyTo,
    }

    mailParams = Object.assign({}, emailer._defaultPayload, mailParams);

    emailer.sendToEmail('contact-page', ContactPage.contactEmail, undefined, mailParams, (error) => {
        if (error) {
            winston.error("[plugin/contactpage] Failed to send mail:" + error);
            return res.status(500).json({ success: false, message: '[[contactpage:error.mail]]' });
        }
        return res.json({ success: true });
    });
}

function modifyFrom(mailData) {
    mailData.from_name = mailData._raw.from_name;
    mailData.replyTo = mailData._raw.replyTo;
    return mailData;
}

function renderAdmin(req, res) {
    return res.render('admin/plugins/contact-page');
}



//widgets
Widget.renderBusinessData = async function(widget) {
    if (!isVisibleInCategory(widget)) {
        return null;
    }

    let cid;

    if (widget.data.cid) {
        cid = widget.data.cid;
    } else if (widget.templateData.template.category) {
        cid = widget.templateData.cid;
    } else if (widget.templateData.template.topic && widget.templateData.category) {
        cid = widget.templateData.category.cid;
    }
    let postsData;
    if (cid) {
        postsData = await categories.getRecentReplies(cid, 1, 1000);
        postsData = postsData.map(item => ({
            ...item,
            data: item.content.split('<br />\n')
        }));
    }
    const isadmin = await user.isAdministrator(widget.uid);

    const subcategories = new Set(postsData.map(item => item.data.length > 3 ? item.data[3] : ''));
    const cities = new Set(postsData.map(item => item.data.length > 4 ? item.data[4] : ''));

    const data = {
        posts: postsData,
        subcategories: [...subcategories],
        cities: [...cities],
        cid: cid,
        isadmin: isadmin,
        relative_path: nconf.get('relative_path'),
    };

    widget.html = await app.renderAsync('widgets/business', data);

    return widget;

};

Widget.renderRecentViewWidget = async function(widget) {
    const data = await topics.getLatestTopics({
        uid: widget.uid,
        start: 0,
        stop: 19,
        term: 'month',
    });
    data.relative_path = nconf.get('relative_path');
    data.loggedIn = !!widget.req.uid;
    data.config = data.config || {};
    data.config.relative_path = nconf.get('relative_path');

    widget.html = await app.renderAsync('widgets/recent', data);
    widget.html = widget.html.replace(/<ol[\s\S]*?<br \/>/, '').replace('<br>', '');
    return widget;
};

function getCidsArray(widget) {
    const cids = widget.data.showCid || '';
    return cids.split(',').map(c => parseInt(c, 10)).filter(Boolean);
}

function isVisibleInCategory(widget) {
    const cids = getCidsArray(widget);
    return !(cids.length && (widget.templateData.template.category || widget.templateData.template.topic) && !cids.includes(parseInt(widget.templateData.cid, 10)));
}

Widget.defineWidgets = async function(widgets) {
    const widgetData = [{
            widget: 'business',
            name: 'Business',
            description: 'Business Data',
            content: 'admin/business',
        },
        {
            widget: 'recentviewtzafon',
            name: 'Recent View Tzafon',
            description: 'Renders the /recent page',
            content: 'admin/defaultwidget',
        },
    ];

    await Promise.all(widgetData.map(async function(widget) {
        widget.content = await app.renderAsync(widget.content, {});
    }));

    widgets = widgets.concat(widgetData);

    return widgets;
};

// home page
Widget.defineWidgetAreas = function(areas, callback) {
    areas = areas.concat([{
            'name': 'Custom HP Content',
            'template': 'homepage.tpl',
            'location': 'hp-content'
        },
        {
            'name': 'Custom HP Header',
            'template': 'homepage.tpl',
            'location': 'hp-header'
        }
    ]);

    callback(null, areas);
};

Widget.serveHomepage = function(params) {
    params.res.render('homepage', {
        template: {
            name: 'homepage'
        }
    });
};

Widget.addListing = function(data, callback) {
    data.routes.push({
        route: 'customHP',
        name: 'Custom Homepage'
    });
    callback(null, data);
};