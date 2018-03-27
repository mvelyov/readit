'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "name" on table "tags"
 * changeColumn "avatar" on table "users"
 *
 **/

var info = {
    "revision": 4,
    "name": "removed-allowNullFalse-for-tags-changed-user-default-avatar-pic",
    "created": "2018-03-27T08:57:56.885Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "tags",
            "name",
            {
                "type": Sequelize.STRING,
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
                "defaultValue": "https://pbs.twimg.com/profile_images/624586699423612928/sWvLOJXY_400x400.jpg",
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
