'use strict';

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


const Widget = module.exports;

require('./contact')(Widget)
require('./widgets')(Widget)
require('./homepage')(Widget)
require('./custom-register')(Widget)

Widget.init = async function(params) {
    Widget.initWidgets(params);
    Widget.initContact(params);
    Widget.initCutomRegister(params);
};