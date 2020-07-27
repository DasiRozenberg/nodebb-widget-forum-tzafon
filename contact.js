module.exports = function(Widget) {
    const ContactPage = {};

    Widget.initContact = function(params) {
        let router = params.router;
        let middleware = params.middleware;

        router.get('/contact', middleware.buildHeader, renderContact);
        router.get('/api/contact', renderContact);
        router.post('/contact', postContact);

        // admin panel
        router.get('/admin/plugins/contact-page', middleware.admin.buildHeader, renderAdmin);
        router.get('/api/admin/plugins/contact-page', renderAdmin);

        meta.settings.get('contactpage', (err, options) => {
            if (err) {
                winston.warn(`[plugin/contactpage] Unable to retrieve settings, will keep defaults: ${err.message}`);
            } else {
                // load setting from config if exist
                keys = ["reCaptchaPubKey", "reCaptchaPrivKey", "contactEmail", "messageFooter"];
                for (let settingName of keys) {
                    if (options.hasOwnProperty(settingName)) {
                        ContactPage[settingName] = options[settingName];
                    }
                }
            }
        });
    }

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

    Widget.sendEmail = function(mailData, callback) {
        if (mailData && mailData.template == "contact-page") {
            addAttachment(mailData);
        }
        emailer.sendViaFallback(mailData)
            .then(response => callback(response, mailData))
            .catch(err => callback(err, mailData));
    }

    function renderContact(req, res) {
        return res.render('contact', {
            recaptcha: ContactPage.reCaptchaPubKey,
            title: "Contact"
        });
    }

    async function postContact(req, res) {
        if (!req.body.email || !req.body.name || !req.body.subject || !req.body.message) {
            return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete]]' });
        }

        const file = req.body.file;
        const fileName = req.body.fileName;

        if (ContactPage.reCaptchaPubKey) {
            if (!req.body['g-recaptcha-response']) {
                return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete.recaptcha]]' });
            }
            simpleRecaptcha(ContactPage.reCaptchaPrivKey, req.ip, req.body['g-recaptcha-response'], (err) => {
                if (err) {
                    return res.status(400).json({ success: false, msg: '[[contactpage:error.invalid.recaptcha]]' });
                } else {
                    sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, file, res);
                }
            });
        } else {
            sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, file, fileName, res);
        }
    }

    function sendMail(replyTo, name, subject, message, file, fileName, res) {
        let mailParams = {
            content_text: message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            file: file,
            cid: fileName,
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

    function addAttachment(mailData) {
        const file = mailData._raw.file;
        const cid = mailData._raw.cid;
        mailData.attachments = [{
            filename: cid,
            // content: new Buffer(file, 'binary'),
            content: file.split("base64,")[1],
            encoding: 'base64',
            cid
        }];
    }

    function renderAdmin(req, res) {
        return res.render('admin/plugins/contact-page');
    }
}