'use strict';

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
const meta = require.main.require('./src/meta');

let app;

const Widget = module.exports;

Widget.init = async function(params) {
    app = params.app;
};

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

    const subcategories = new Set(postsData.map(item => item.data.length > 2 ? item.data[2] : ''));
    const cities = new Set(postsData.map(item => item.data.length > 4 ? item.data[4] : ''));

    const data = {
        posts: postsData,
        subcategories: [...subcategories],
        cities: [...cities],
        cid: cid,
        isadmin: isadmin,
        relative_path: nconf.get('relative_path'),
    };
    console.log(data);

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
    console.log(data);
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