

const messageValidation = require('../Validation/messageValidation');
const messageServices = require('../Services/messageService');

const save = async (data) => {
    console.log("data receive from server:");

    return new Promise(async (resolve, reject) => {
        try {
            let validate = await messageValidation.save(data);
            console.log('validate');
            if (validate.status === 'ERROR') {
                return reject({ status: 400, error: validate.message });
            }
            let response = await messageServices.save(data);
            console.log('response controller:');
            resolve(response);  
        } catch (error) {
            reject({ status: 500, error: 'Internal Server Error' });
        }
    });
};

const getData = async(data)=>{
    console.log("data/cpntroller-gg--->>>>",data);
    return new Promise(async (resolve, reject) => {
        try {
            let response = await messageServices.getData(data);
            console.log('response --/controoler--gg-',response );
            resolve(response);  
        } catch (error) {
            reject({ status: 500, error: 'Internal Server Error' });
        }
    });
}


module.exports = { save , getData };
