'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "avatar" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "changed-default-icon-for-users",
    "created": "2018-03-23T10:43:37.343Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "users",
        "avatar",
        {
            "type": Sequelize.STRING,
            "validate": {
                "isUrl": true
            },
            "defaultValue": "http://files.softicons.com/download/tv-movie-icons/iron-man-icon-set-by-svengraph/ico/Classic_Helmet.ico",
            "allowNull": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
