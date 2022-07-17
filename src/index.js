const mb = require('mountebank')
const settings = require('./settings')
const helloWorld = require('./helloWorld');
const loginService = require('./loginService');
const userRegistration = require('./userRegistrationService');

const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*']
});

mbServerInstance.then(function() {
    helloWorld.addService();
    loginService.addService();
    userRegistration.addNewUser();

});