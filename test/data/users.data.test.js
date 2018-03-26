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
            return Model.findOne();
        }
    }

    data = new UsersData();

    describe('findByUserName()', () => {
        it('when user exists, expect to return the user', async() => {
            const userName = 'test user';
            const user = {
                'username': userName,
            }

            Model.findOne = () => {
                return user;
            }

            const resultObject = await data.findByUserName(userName);

            expect(resultObject).to.be.equal(user);
        })
        it('when user doesnt exist, expect to return null', async() => {
            username = null;

            Model.findOne = () => {
                return username;
            }
            
            const resultObject = await data.findByUserName('test')

            expect(resultObject).to.be.equal(username);
        })
    })
})