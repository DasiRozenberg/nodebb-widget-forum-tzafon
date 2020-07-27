const nconf = require.main.require('nconf');
const validator = require.main.require('validator');
const benchpressjs = require.main.require('benchpressjs');
const _ = require.main.require('lodash');
const winston = require.main.require('winston');

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



module.exports = function(Widget) {
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
}