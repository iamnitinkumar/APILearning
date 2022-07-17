const mb = require('mountebank')
const settings = require('./config/settings')
const helloWorld = require('./stubs/helloWorld')
const loginService = require('./stubs/loginService')
const getUser = require('./stubs/getUser')

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
    getUser.addService();
    
});