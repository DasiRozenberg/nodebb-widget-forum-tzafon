const nconf = require.main.require('nconf');
const categories = require.main.require('./src/categories');
const user = require.main.require('./src/user');
const topics = require.main.require('./src/topics');
const posts = require.main.require('./src/posts');
const emailer = require.main.require('./src/emailer');
const middleware = require.main.require('./src/middleware');
const benchpressjs = require.main.require('benchpressjs');
const middlewares = [middleware.applyCSRF, middleware.applyBlacklist];

module.exports = function(Widget) {
    let app;

    Widget.initWidgets = function(params) {
        app = params.app;
        let router = params.router;
        router.post('/api/notify-copoun', middlewares, emailCopoun);
    }

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
                data: item.content.split('<br />\n').map(item => item !== '.' ? item : "")
            }));
        }
        const isadmin = await user.isAdministrator(widget.uid);

        const isBusiness = widget.data.pluginType === 'business';
        const isApartment = widget.data.pluginType === 'apartment';
        const isAd = widget.data.pluginType === 'ad';
        const isAdWithFilter = widget.data.pluginType === 'adWithFilter';
        const isCopouns = widget.data.pluginType === 'copoun';

        const filter = {};

        if (isBusiness) {
            const subcategories = new Set(postsData.map(item => item.data.length > 2 ? item.data[2] : '').filter(item => item));
            const cities = new Set(postsData.map(item => item.data.length > 4 ? item.data[4] : '').filter(item => item));

            filter.subcategories = [...subcategories];
            filter.cities = [...cities];
        } else if (isApartment) {
            const apartmentTypes = new Set(postsData.map(item => item.data.length > 1 ? item.data[1] : '').filter(item => item));
            const cities = new Set(postsData.map(item => item.data.length > 2 ? item.data[2] : '').filter(item => item));
            const bedNums = new Set(postsData.map(item => item.data.length > 5 ? item.data[5] : '').filter(item => item));

            filter.apartmentTypes = [...apartmentTypes];
            filter.cities = [...cities];
            filter.bedNums = [...bedNums];
        } else if (isAd) {
            // nothing
        } else if (isAdWithFilter) {
            const subcategories = new Set(postsData.map(item => item.data.length > 5 ? item.data[5] : '').filter(item => item));
            const cities = new Set(postsData.map(item => item.data.length > 3 ? item.data[3] : '').filter(item => item));

            filter.subcategories = [...subcategories];
            filter.cities = [...cities];
        } else if (isCopouns) {
            // nothing
        }

        const data = {
            posts: postsData,
            ...filter,
            isBusiness,
            isApartment,
            isAd,
            isAdWithFilter,
            isCopouns,
            cid: cid,
            isadmin: isadmin,
            relative_path: nconf.get('relative_path'),
        };

        widget.html = await app.renderAsync('widgets/business', data);

        return widget;

    };

    Widget.renderRecentViewWidget = async function(widget) {
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
        } else {
            cid = await categories.getCidsByPrivilege('categories:cid', widget.uid, 'topics:read');
        }

        const topicsData = await topics.getRecentTopics(cid, widget.uid, 0, 10);

        const data = {
            topics: topicsData.topics,
            relative_path: nconf.get('relative_path'),
            loggedIn: !!widget.req.uid,
            config: {
                relative_path: nconf.get('relative_path'),
            }
        };
        widget.html = await app.renderAsync('widgets/recent', data);
        widget.html = widget.html.replace(/<ol[\s\S]*?<br \/>/, '').replace('<br>', '');
        return widget;
    };

    Widget.renderHTMLWidget = async function(widget) {
        if (!isVisibleInCategory(widget)) {
            return null;
        }
        const tpl = widget.data ? widget.data.html : '';
        widget.html = await benchpressjs.compileRender(String(tpl), widget.templateData);
        return widget;
    };

    function getCidsArray(widget) {
        const cids = widget.data.showCid || '';
        return cids.split(',').map(c => parseInt(c, 10)).filter(Boolean);
    }

    function isVisibleInCategory(widget) {
        const cids = getCidsArray(widget);
        return !(cids.length) ||
            ((widget.templateData.template.category || widget.templateData.template.topic) && cids.includes(parseInt(widget.templateData.cid, 10))) ||
            (!(widget.templateData.template.category || widget.templateData.template.topic) && cids.includes(-1));
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
                content: 'admin/recenttzafon',
            },
            {
                widget: 'htmltzafon',
                name: 'HTML Tzafon',
                description: 'Renders a html plugin',
                content: 'admin/html',
            },
        ];

        await Promise.all(widgetData.map(async function(widget) {
            widget.content = await app.renderAsync(widget.content, {});
        }));

        widgets = widgets.concat(widgetData);

        return widgets;
    };

    async function emailCopoun(req, res) {
        const userObj = await user.getUsersFields(req.uid, ['uid', 'email', 'username', 'userslug', 'banned']);
        let { uid, username, userslug } = userObj;
        const subject = 'פורום צפון | קופונים';
        const post = await posts.getPostData(pid);
        const postData = post.content.split('\n').map(item => item !== '.' ? item : "")
        const title = 'קיבלת קופון!';
        const options = {
            subject,
            username,
            postData: postData,
            title,
            userslug,
            url: null
        }
        emailer.send('copoun', uid, options, (err) => {
            if (err) {
                return res.status(400).json({ success: false });
            } else {
                res.json({ success: true });
            }
        })
    }



    // async function emailCopoun(req, res) {
    //     const pid = req.body.pid;
    //     const uid = req.uid;

    //     notifications.create({
    //         subject: 'פורום צפון | קופונים',
    //         bodyShort: `קיבלת קופון!`,
    //         bodyLong: await getBodyLong(pid),
    //         nid: ':uid:' + uid + Math.random(),
    //         from: 1, // 1 is my admin account
    //         type: 'email'
    //     }, (err, notification) => {
    //         notifications.push(notification, uid, () => {
    //             res.json({ success: true });
    //         });
    //     });
    // }

    // async function getBodyLong(pid) {
    //     const post = await posts.getPostData(pid);
    //     const postData = post.content.split('\n').map(item => item !== '.' ? item : "")

    //     return `
    //     <div class="popup" style="display:none">
    //         <div class="popup-content">
    //             <div class="popup-close">
    //                 <i class="fa fa-close"></i>
    //             </div>
    //             <div class="popup-header">
    //                 ${postData[1]}
    //             </div>
    //             <div class="popup-body">
    //                 ${postData[2]}
    //                 <br />

    //                 <span class="adHeader">
    //                     ${postData[3]}
    //                     <br />
    //                     ${postData[4]}
    //                 </span>
    //                 <br />
    //                 <br />

    //                 <span>
    //                     ${postData[5]}
    //                     <br />
    //                     ${postData[6]}
    //                     <br />
    //                     ${postData[7]}
    //                 </span>
    //                 <br />
    //                 <br />
    //             </div>
    //         </div>
    //     </div>
    //     `;
    // }

    // async function emailCopoun(req, res) {
    //     if (!req.body.pid) {
    //         return res.status(400).json({ success: false, msg: 'קוד קופון לא תקין' });
    //     }

    //     await sendMail(req.body.email, req.body.name, 'פורום צפון | קופונים', req.body.message, null, res);
    // }

    // async function sendMail(replyTo, name, subject, message, uploadedFile, res) {
    //     let mailParams = {
    //         content_text: message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
    //         uploadedFile,
    //         footer_text: ContactPage.messageFooter,
    //         from_name: name,
    //         subject: subject,
    //         template: 'contact-page',
    //         uid: 0,
    //         replyTo,
    //     }

    //     mailParams = Object.assign({}, emailer._defaultPayload, mailParams);
    //     const userData = await user.getUserDataByUID(widget.uid, widget.uid);

    //     emailer.sendToEmail('copoun-page', userData.email, undefined, mailParams, (error) => {
    //         if (error) {
    //             winston.error("[plugin/contactpage] Failed to send mail:" + error);
    //             return res.status(500).json({ success: false, message: '[[contactpage:error.mail]]' });
    //         }
    //         return res.json({ success: true });
    //     });
    // }
}