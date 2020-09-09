const user = require.main.require('./src/user');
const db = require.main.require('./src/database');

module.exports = function(Widget) {
    var customFields = {
        city: "",
        consent: ""
    };

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

    Widget.addField = function(params, callback) {
        for (var key in customFields) {

            if (key == "") {
                callback(null, params);
                return;
            }

            switch (key) {
                case 'city':
                    var html = `<input class="form-control" type="text" name="city" id="city" placeholder="הכנס עיר">
                                <span class="custom-feedback" id="city-notify"></span>
                                <span class="help-block">יש למלא את העיר שבה אתה גר</span>`;
                    var label = "עיר";
                    break;

                case 'consent':
                    var html = `<input class="checkbox-inline" type="checkbox" name="consent" id="consent">
                                <span class="custom-feedback" id="consent-notify"></span>
                                <span class="consent-text">
                                    אני מאשר שקראתי והבנתי את <a href="/topic/270" target="_blank">תקנון האתר</a> ואת <a href="/topic/269" target="_blank">מדיניות הפרטיות</a> של האתר.
                                </span>`
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

            if (key === 'consent' && value !== 'on') {
                error = { message: 'יש לאשר את תנאי השימוש באתר.' };
            }
            if (key === 'city' && value === '') {
                error = { message: 'נא למלא את שם העיר בה אתה גר.' };
            }
        }

        callback(error, params);
    };

    Widget.creatingUser = function(params, callback) {
        params.user.city = params.data.city;

        callback(null, params);
    };

    Widget.createdUser = function(params) {
        var addCustomData = {
            city: params.data.city
        }

        var keyID = 'user:' + params.user.uid + ':ns:custom_fields';

        db.setObject(keyID, addCustomData, function(err) {
            if (err) {
                return callback(err);
            }
        });
    };

    Widget.getRegistrationQueue = function(params, callback) {
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