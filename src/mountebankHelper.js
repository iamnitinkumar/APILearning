const fetch =require('node-fetch');
//import fetch from 'node-fetch';
const setting = require('./settings');


function postImposter(body){
    console.log(setting)
    const url=`http://127.0.0.1:${setting.port}/imposters`
    return fetch( url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body)
    })
}

module.exports ={ postImposter }