class Data {
    constructor(Model) {
        this.Model = Model;
    }

    getAll() {
        return this.Model.findAll();
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
