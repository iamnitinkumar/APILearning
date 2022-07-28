const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings');

function addNewUser(){
    const successResponse = { message: "User registration complete successfully" }
    const badRequest = { message: "400 Bad Request" }
    const methodsNotAllowed = { message: "Method not allowed 405" }
    const serviceNotFoundResponse = { message: "The service is not found 404" }
    const stubs = [
        {
            predicates:[{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/createuser" } },
                    { matches: { body: { "firstName": "^([A-Za-z\-]{1,31}$)", 
                    "lastName": "^([A-Za-z\-]{1,31}$)", 
                    "email": "^[a-zA-Z0-9_\\\-\\\.]+[@][a-zA-Z]+[.][a-z]{2,3}$", 
                    "password": "^(?=.*?[a-zA-Z0-9#?!@$%^&*-]).{8,16}$",
                    "phone": "^[8 9][0-9]{9}" }}},
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
                not: {startsWith: { "path": "/createuser" }}
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
            predicates:[{
              "not": 
                { "equals": { method: "POST" } },
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
            "statusCode": 404,
            "headers":{
                "connection": "close"
            },
            body: JSON.stringify(serviceNotFoundResponse)
        }
    };

    return mbHelper.postImposter(imposter);
}
module.exports = { addNewUser };