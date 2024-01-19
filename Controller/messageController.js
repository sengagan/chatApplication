

const messageValidation = require('../Validation/messageValidation');
const messageServices = require('../Services/messageService');

const save = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let validate = await messageValidation.save(data);
            console.log('validate', validate);
            if (validate.status === 'ERROR') {
                return reject({ status: 400, error: validate.message });
            }
            let response = await messageServices.save(data);
            console.log('response ', response);
            resolve(response);
        } catch (error) {
            reject({ status: 500, error: 'Internal Server Error' });
        }
    });
};


module.exports = { save };
