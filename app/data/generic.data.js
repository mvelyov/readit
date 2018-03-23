class Data {
    constructor(Model) {
        this.Model = Model;
    }

    getAll() {
        return this.Model.findAll();
    }

    getAllSubreadits(id) {
        return this.Model.findAll({
                where: {
                    subreaditId: id,
                },
        });
    }

    getByName(value) {
        return this.Model.findOne({
            where: {
                name: value,
            },
        });
    }
    getAllSubreadits(id) {
        return this.Model.findAll({
                where: {
                    subreaditId: id,
                },
        });
    }

    getById(id) {
        return this.Model.findById(id);
    }

    create(newObject) {
        return this.Model.create(newObject);
    }

    findCreateFind(columnName, value) {
        return this.Model.findCreateFind({
            where: {
                columnName: value,
            },
        });
    }
}

module.exports = Data;
