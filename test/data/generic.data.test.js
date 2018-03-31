const {
    expect,
} = require('chai');

const Data = require('../../app/data/generic.data');

describe('Generic data', () => {
    let Model = null;
    let data = null;
    Model = {
        findAll: () => {},
        findById: (id) => {},
        findOne: (name) => {},
        create: (object) => {},
        findCreateFind: (columnName, value) => {},
    }
    data = new Data(Model);


    describe('getAll()', () => {
        describe('when valid', () => {
            it('when no data exists, expect to return empty array', async () => {

                Model.findAll = () => {
                    return [];
                };

                const objects = await data.getAll();

                expect(objects).to.be.empty;
            })
            it('when object exists, expect to return the object', async () => {
                const object = ['test', 1, 2, 3]

                Model.findAll = () => {
                    return object;
                };


                const resultObject = await data.getAll();

                expect(resultObject).deep.equal(object);
            })
        })
    })
    describe('getByName()', () => {
        describe('when valid', () => {
            it('existing name, expect to return the object', async () => {
                const name = 'test name';
                const object = {
                    name,
                };

                Model.findOne = (name) => {
                    return object;
                };

                const resultObject = await data.getByName(name);

                expect(resultObject).to.exist;
                expect(resultObject.name).to.equal(name);
            })
        })
        describe('when invalid', () => {
            it('non-existing name, expect to return null', async () => {
                Model.findOne = (name) => {
                    return null;
                };

                const resultObject = await data.getByName('test name');

                expect(resultObject).to.be.null;
            })
        })
    })
    describe('getById()', () => {
        describe('when valid', () => {
            it('existing id, expect to return the object', async () => {
                const id = 1;
                const object = {
                    id: 1,
                };

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
            it('when create and add object, expect to return the object', async () => {
                const object = {
                    id: 'test create',
                }

                Model.create = (object) => {
                    return object;
                }

                const resultObject = await data.create(object);
                expect(resultObject).deep.equal(object);
            })
        })
        describe('when invalid', () => {

        })
    })
    describe('findCreateFind()', () => {
        describe('when valid', () => {
            it('when object doesnt exist, expect to create and return the object', async () => {
                const columnName = 'id';
                const value = 'test findCreateFind'
                const object = {}
                const test = {
                    columnName: value,
                }

                Model.findCreateFind = (columnName, value) => {
                    object.test = test;
                    return object;
                }

                const resultObject = await data.findCreateFind(columnName, value);
                expect(resultObject).to.be.equal(object);
            })
        })
    })
})