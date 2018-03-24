const {
    expect,
} = require('chai');

const Data = require('../../app/data/generic.data');
const UsersData = require('../../app/data/users.data');

describe('Users Data', () => {
    let data = null;
    let user = null;
    let username = null;
    let Model = {
        findOne: () => {},
    }

    class UsersData extends Data {
        constructor(){
            super(user)
        };
        findByUserName(username){
            return Model;
        }
    }

    data = new UsersData();

    describe('findByUserName()', () => {
        it('when user exists, expect to return the user', async() => {
            const userObject = {};
            const columnName = 'userName';
            const userName = 'test user';
            const user = {
                columnName: userName,
            }

            Model.findOne = () => {
                userObject.userName = userName;
                return userObject;
            }

            const resultObject = await data.findByUserName(userName);

            expect(resultObject).to.be.equal(Model);
        })
        it('when user doesnt exist, expect to return null', async() => {
            username = null;

            Model.findOne = () => {
                return username;
            }
            
            const resultObject = await data.findByUserName('test')

            expect(resultObject).to.be.equal(Model);
        })
    })
})