'use strict';

define('forum/contact', ['translator', 'https://www.google.com/recaptcha/api.js?onload=renderContactPageCaptcha&render=explicit'], function(translator) {
    var Contact = {};
    Contact.init = function() {
        var email = $('#email');

        var contactMsgTemplates = {
            'ad': "שם העסק:\nשרות:\nעיר:\nרחוב:\nשעות פתיחה:\nטלפון:\nהערות:\n",
            'apartment': "סוג דירה: דירה / צימר / חדרי אירוח \nכתובת:\nמס' חדרים:\nמס' מיטות:\nמחיר ללילה-\nמייל או טלפון ליצירת קשר:\nפרטים נוספים על המקום:\n\n\nניתן להוסיף עד 4 תמונות.\n"
        };
        var contactSubjectTemplates = {
            'ad': "פרסום/ שדרוג עסק",
            'apartment': "הוספת צימרים וחדרי אירוח"
        };
        var mode = location.href.split('mode=')[1];
        $('#message').val(contactMsgTemplates[mode]);
        $('#subject').val(contactSubjectTemplates[mode]);

        email.on('blur', function() {
            if (email.val().length) {
                if (!utils.isEmailValid(email.val())) {
                    showError('[[contactpage:invalid.email]]')
                } else {
                    $('#contact-notify').hide();
                }
            }
        });

        $('#send').on('click', function(e) {
            e.preventDefault();
            $('#contact-notify').hide();
            $('#contact-form').ajaxSubmit({
                headers: {
                    'x-csrf-token': config.csrf_token,
                },
                success: function(data) {
                    showSuccess('[[contactpage:send.success]]');
                    $('#contact-form').hide();
                },
                error: function(resp) {
                    if (resp && (resp.status == 400 || resp.status == 500) && resp.responseJSON) {
                        showError(resp.responseJSON.msg);
                    } else {
                        showError('[[contactpage:error.unknown]]');
                    }
                }
            });
        });

        function showError(msg) {
            translator.translate(msg, function(translatedMsg) {
                $('#contact-notify').find('p').html(translatedMsg);
                $('#contact-notify').removeClass('hidden');
                $('#contact-notify-success').hide();
                $('#contact-notify').show();
            });
        }

        function showSuccess(msg) {
            translator.translate(msg, function(translatedMsg) {
                $('#contact-notify-success').find('p').html(translatedMsg);
                $('#contact-notify-success').removeClass('hidden');
                $('#contact-notify').hide();
                $('#contact-notify-success').show();
            });
        }

        // if grecaptcha.render is available, this is not the first load, so we need to call renderContactPageCaptcha here.
        if (grecaptcha && grecaptcha.render) {
            renderContactPageCaptcha();
        }
    };
    return Contact;
});

function renderContactPageCaptcha() {
    if ($('#contact-page-google-recaptcha').length > 0) {
        grecaptcha.render('contact-page-google-recaptcha', {
            sitekey: config.contactpage.reCaptchaPubKey,
            callback: function() {
                var error = utils.param('error');
                if (error) {
                    app.alertError(error);
                }
            }
        });
    }
}