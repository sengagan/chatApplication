

const messageValidation = require('../Validation/messageValidation');
const messageServices = require('../Services/messageService');

const save = async (data,file) => {
    console.log("data/controller---",data,"save/controller-file-",file);

    return new Promise(async (resolve, reject) => {
        try {
            // let validate = await messageValidation.save(data);
            // console.log('validate', validate);
            // if (validate.status === 'ERROR') {
            //     return reject({ status: 400, error: validate.message });
            // }

            let response = await messageServices.save(data,file);
            console.log('response --', response);
            resolve(response);  
        } catch (error) {
            reject({ status: 500, error: 'Internal Server Error' });
        }
    });
};

const getData = async(data)=>{
    console.log("data/cpntroller");
    return new Promise(async (resolve, reject) => {
        try {
            let response = await messageServices.getData(data);
            console.log('response --/controoler---', );
            resolve(response);  
        } catch (error) {
            reject({ status: 500, error: 'Internal Server Error' });
        }
    });
}


module.exports = { save , getData };
