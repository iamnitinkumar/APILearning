const fetch =require('mode-fetch');
//import fetch from 'node-fetch';
const setting = reqired('./settings');

function postImposter(body){
    const url='http://127.0.0.1:${setting.port}/inposters'
    return fetch( url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        bosy: JSON.stringify(body)
    })
}

module.exports ={ postImposter}