'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "password" on table "users"
 * changeColumn "password" on table "users"
 * changeColumn "userName" on table "users"
 * changeColumn "userName" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-19T16:59:12.109Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "users",
            "password",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "notEmpty": true,
                    "len": [3, 20]
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "password",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "notEmpty": true,
                    "len": [3, 20]
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "userName",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "notEmpty": true
                },
                "allowNull": false,
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "userName",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "notEmpty": true
                },
                "allowNull": false,
                "unique": true
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
