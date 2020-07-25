'use strict';

define('forum/contact', ['translator', 'https://www.google.com/recaptcha/api.js?onload=renderContactPageCaptcha&render=explicit'], function(translator) {
    var Contact = {};
    Contact.init = function() {
        var email = $('#email');
        var fileUpload = $('#fileUpload');

        var contactMsgTemplates = {
            'ad': "שם העסק:\nשרות:\nעיר:\nרחוב:\nשעות פתיחה:\nטלפון:\nהערות:\n",

        };
        var contactSubjectTemplates = {
            'ad': "פרסום/ שדרוג עסק",
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
        fileUpload.on('change', function() {
            if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#file').val(e.target.result);
                }

                reader.readAsDataURL(this.files[0]); // convert to base64 string
            }
        })

        $('#send').on('click', function(e) {
            e.preventDefault();
            $('#contact-notify').hide();
            $('#fileUpload').prop("disabled", true);
            $('#contact-form').ajaxSubmit({
                headers: {
                    'x-csrf-token': config.csrf_token,
                },
                success: function(data) {
                    showSuccess('[[contactpage:send.success]]');
                    $('#contact-form').hide();
                },
                error: function(resp) {
                    $('#fileUpload').prop("disabled", false);
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