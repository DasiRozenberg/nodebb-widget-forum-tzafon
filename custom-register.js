const user = require.main.require('./src/user');
const db = require.main.require('./src/database');

module.exports = function(Widget) {
    var customFields = {
            city: "",
            consent: ""
        },
        customData = [];

    Widget.initCutomRegister = function(params) {};

    Widget.customHeaders = function(headers, callback) {
        for (var key in customFields) {

            switch (key) {
                case 'city':
                    var label = "עיר";
                    break;

                case 'consent':
                    var label = "תנאי השימוש";
                    break;
            }

            headers.headers.push({
                label: label
            });
        }

        callback(null, headers);
    };

    Widget.customFields = function(params, callback) {
        var users = params.users.map(function(user) {

            if (!user.customRows) {
                user.customRows = [];

                for (var key in customFields) {
                    user.customRows.push({ value: customFields[key] });
                }
            }

            return user;
        });

        callback(null, { users: users });
    };

    Widget.addField = function(params, callback) {
        for (var key in customFields) {

            if (key == "") {
                callback(null, params);
                return;
            }

            switch (key) {
                case 'city':
                    var html = `<input class="form-control" type="text" name="city" id="city" placeholder="באיזו עיר אתה גר?">
                                <span class="custom-feedback" id="city-notify"></span>
                                <span class="help-block">יש למלא את העיר שבה אתה גר</span>`;
                    var label = "עיר";
                    break;

                case 'consent':
                    var html = `<input class="form-control" type="checkbox" name="consent" id="consent>
                                <span class="custom-feedback" id="consent-notify"></span>'`
                    var label = "תנאי השימוש";
                    break;
            }

            var captcha = {
                label: label,
                html: html
            };

            if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
                params.templateData.regFormEntry.push(captcha);
            } else {
                params.templateData.captcha = captcha;
            }
        }

        callback(null, params);
    };

    Widget.checkField = function(params, callback) {
        var userData = params.userData;
        var error = null;

        for (var key in customFields) {

            var value = userData[key];

            if (key === 'consent') {
                error = { message: 'יש לאשר את תנאי השימוש באתר.' };
            }
        }

        callback(error, params);
    };

    Widget.creatingUser = function(params, callback) {
        customData = params.data.customRows;

        callback(null, params);
    };

    Widget.createdUser = function(params) {
        var addCustomData = {
            city: customData[0].value,
            consent: customData[1].value
        }

        var keyID = 'user:' + params.uid + ':ns:custom_fields';

        db.setObject(keyID, addCustomData, function(err) {
            if (err) {
                return callback(err);
            }
        });
    };

    Widget.addToApprovalQueue = function(params, callback) {
        var data = params.data;
        var userData = params.userData;

        data.customRows = [];

        for (var key in customFields) {

            switch (key) {
                case 'city':
                    var fieldData = params.userData['city'];
                    break;

                case 'consent':
                    var fieldData = params.userData['consent'];
                    break;
            }

            customFields[key] = fieldData;
            data.customRows.push({ value: customFields[key] });
        }

        callback(null, { data: data, userData: userData });
    };
}