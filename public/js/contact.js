'use strict';

define('admin/plugins/contact-page', ['settings'], function(Settings) {
    var ContactPage = {};

    ContactPage.init = function() {
        Settings.load('contactpage', $('.contact-page-settings'));

        var contactMsgTemplates = {
            'ad': "שם העסק:\nשרות:\nעיר:\nרחוב:\nשעות פתיחה:\nטלפון:\nהערות:\nצרוף קובץ:\n",
            'update-ad': "שם העסק:\nשרות:\nעיר:\nרחוב:\nשעות פתיחה:\nטלפון:\nהערות:\nצרוף קובץ:\n",

        };
        var contactSubjectTemplates = {
            'ad': "פרסום עסק",
            'update-ad': "שדרוג עסק",
        };
        var mode = location.href.split('mode=')[1];
        $('#message').val(contactMsgTemplates[mode]);
        $('#subject').val(contactSubjectTemplates[mode]);

        $('#save').on('click', function() {
            Settings.save('contactpage', $('.contact-page-settings'), function() {
                app.alert({
                    type: 'success',
                    alert_id: 'contactpage-saved',
                    title: 'Settings Saved',
                    message: 'Please reload your NodeBB to apply these settings',
                    clickfn: function() {
                        socket.emit('admin.reload');
                    }
                })
            });
        });
    };

    return ContactPage;
});