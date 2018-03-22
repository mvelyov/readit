class UserController {
    constructor(data) {
        this.data = data;
    }
    async createUser(userObject) {
        const username = userObject.userName;
        const user = await this.data.users.findByUserName(username);
        if (user) {
            return 'error';
        }
        await this.data.users.create(userObject);
        return user;
    }

    async searchForUser(userObject) {
        const logInUserName = userObject.userName;
        const logInPassword = userObject.password;

        const dbUser = await this.data.users.findByUserName(logInUserName);
        if (dbUser !== null &&
            dbUser.userName === logInUserName &&
            dbUser.password === logInPassword) {
                return dbUser.userName;
        }
        return 'error';
    }
}

module.exports = UserController;
