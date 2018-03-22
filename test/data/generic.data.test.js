const {
    expect,
} = require('chai');

const {
    sinon,
} = require('sinon');

const Data = require('../../app/data/generic.data');

describe('Generic data', () => {

    let data = null;
    let Model = null;
    // beforeEach(() => {
        Model = {
            findAll: () => {},
            findById: (id) => [],
            create: (object) => [],
        }
        data = new Data(Model);
        
    // })

    describe('getAll()', () => {
        describe('when valid', () => {
            it ('when no data exists, expect to return empty array', async() => {
                
                // sinon.stub(Model, 'findAll')
                // .returns([]);
                Model.findAll = () => {
                    return [];
                };
                
                const objects = await data.getAll();

                expect(objects).to.be.empty;
            })
            it ('when object exists, expect to return the object', async() => {
                const object = ['test', 1, 2, 3]

                // sinon.stub(Model, 'findAll')
                // .returns(objects);
                Model.findAll = () => {
                    return object;
                };
                

                const resultObjects = await data.getAll();

                expect(resultObjects).deep.equal(object);
            })
        })
        describe('when invalid', () => {
            
        })
   })

    describe('getById()', () => {
        describe('when valid', () => {
            it ('existing id, expect to return the object', async() => {
                const id = 1;
                const object = {
                    id: 1,
                };

                // sinon.stub(Model, 'findById')
                // .returns(object)
                Model.findById = (id) => {
                    return object;
                };

                const resultObject = await data.getById(id);

                expect(resultObject).to.exist;
                expect(resultObject.id).to.equal(id);
            })
        })
        describe('when invalid', () => {
            it('non-existing id, expect to return null', async () => {
                // sinon.stub(Model, 'findById')
                // .returns(null);
                Model.findById = (id) => {
                    return null;
                };

                const resultObject = await data.getById(1);

                expect(resultObject).to.be.null;
            })
        })
    })
    describe('create()', () => {
        describe('when valid', () => {
            
        })
        describe('when invalid', () => {
            
        })
    })
})
