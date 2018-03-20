const {
    expect,
} = require('chai');

const {
    sinon,
} = require('sinon');

const Data = require('../../app/data/generic.data');

describe('Generic data', () => {

    const Model = {
        findAll() {
        
        },
        findById(id) {

        }, 
        create(newObject) {

        }    
    }

    describe('getAll()', () => {
        when('valid', () => {
            it ('when no data exists, expect empty array', async() => {
                
            })
            it ('when object exists, expect to be returned', async() => {
                
            })
        })
        when('invalid', () => {
            
        })
    })
})
