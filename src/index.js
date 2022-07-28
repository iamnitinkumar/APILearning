const mb = require('mountebank');
const settings = require('./config/settings');
const helloWorld = require('./stubs/helloWorld');
const loginService = require('./stubs/loginService');
const userRegistration = require('./stubs/userRegistrationService');
const wishlistService = require('./stubs/wishlistService');

const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*']
});

mbServerInstance.then(function() {
    helloWorld.addService();
    loginService.addLoginService();
    wishlistService.addWishlistService();
    userRegistration.addNewUser();
});