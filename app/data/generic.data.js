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

    finidCreateFind(object, columnName, value) {
        return this.Model.finidCreateFind({
            where: {
                columnName: value,
            },
        });
    }
}

module.exports = Data;
