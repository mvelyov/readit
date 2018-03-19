'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "content" on table "comments"
 * changeColumn "content" on table "posts"
 * changeColumn "name" on table "posts"
 * changeColumn "name" on table "tags"
 * changeColumn "name" on table "tags"
 * changeColumn "avatar" on table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-19T17:00:27.009Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "comments",
            "content",
            {
                "type": Sequelize.TEXT,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "content",
            {
                "type": Sequelize.TEXT,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "tags",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "tags",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "avatar",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "isUrl": true
                },
                "defaultValue": "http://www.softicons.com/tv-movie-icons/iron2man-helmet-icons-by-svengraph",
                "allowNull": false
            }
        ]
    }
];

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
