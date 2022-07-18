const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings');

function addNewUser(){
    const successResponse = { message: "User registration complete successfully" }
    const badRequest = { message: "400 Bad Request" }
    const methodsNotAllowed = { message: "Method not allowed 405" }
    const serviceNotFoundResponse = { message: "The service is not found 503" }

    const stubs = [
        {
            predicates:[{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/createuser" } },
                    { equals: {body: { "firstName": "Virat", "lastName": "Kholi", "email": "viratkohli@test.com", "password": "virat123", "phone": "123456789", "DOB": "15/08/1990" }}}
                ]
            }],
            responses:[{
                is: {
                    statusCode: 201,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(successResponse)
                }
            }],
        },
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/createuser" } },
                    { equals: {body: { "firstName": "", "lastName": "", "email": "", "password": "", "phone": "", "DOB": "" }}}
                ]
            }],
            responses:[{
                is: {
                    statusCode: 400,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(badRequest)
                }
            }]
        },
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/createuser" } },
                    { equals: {body: { "firstName": "0", "lastName": "0", "email": "0", "password": "0", "phone": "0", "DOB": "0" }}}
                ]
            }],
            responses:[{
                is: {
                    statusCode: 405,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(methodsNotAllowed)
                }
            }]
        },
        
    ];

    const imposter = {
        name: "User Registration",
        port: settings.user_registration_service_port,
        protocol: 'http',
        stubs: stubs,
        defaultResponse:{
            "statusCode": 503,
            "headers":{
                "connection": "close"
            },
            body: JSON.stringify(serviceNotFoundResponse)
        }
    };

    return mbHelper.postImposter(imposter);
}
module.exports = { addNewUser };