const Data = require('./generic.data');

const {
    user,
} = require('../../db/models');

class UsersData extends Data {
    constructor() {
        super(user);
    }

    findByUserName(username) {
        return this.Model.findOne({
            where: {
                userName: username,
            },
        });
    }
}

module.exports = UsersData;
