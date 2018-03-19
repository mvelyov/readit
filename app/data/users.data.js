const Data = require('./generic.data');

const {
    // example ; to be changed when models are ready
    User,
} = require('../db/models');

class UsersData extends Data {
    constructor() {
        super(User);
    }

    findByUserName(username) {
        return this.Model.findOne({
            where: {
                username,
            },
        });
    }
}

module.exports = UsersData;
