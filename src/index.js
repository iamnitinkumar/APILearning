const mb = require('mountebank');
const setting = require('./settings');
const helloWorld = require('./helloWorld');

const mbServerInstance =mb.create({
    port : setting.port,
    pidfile: '../mb.pid',
    logfile : '../mb.log',
    protofiles:'../protofile.json',

    ipWhitelist:['*']
});
mbServerInstance.then(function(){
    helloWorld.addService();

});