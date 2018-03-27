'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "headerImage" to table "subreadits"
 *
 **/

var info = {
    "revision": 3,
    "name": "added-default-image-for-subreadits",
    "created": "2018-03-25T16:47:52.577Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "subreadits",
        "headerImage",
        {
            "type": Sequelize.STRING,
            "validate": {
                "isUrl": true
            },
            "defaultValue": "https://www.freewebheaders.com/wordpress/wp-content/gallery/other-backgrounds/red-lonely-chair-website-header-design.jpg",
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
