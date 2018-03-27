const Data = require('./generic.data');

const {
    user,
} = require('../../db/models');

class UsersData extends Data {
    constructor() {
        super(user);
    }

    findByUserName(username) {
        const currentUser = this.Model.findOne({
            where: {
                userName: username,
            },
        });
        return currentUser;
    }
}

module.exports = UsersData;
