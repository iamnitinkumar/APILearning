const mbHelper = require('./mountebankHelper');
const settings = require('./settings');

function addNewUser(){
    const successResponse = { message: "User registration complete successfully" }
    const badRequest = { message: "Bad Request 400" }
    const methodsNotAllowed = { message: "Method not allowed 405" }
    const serviceNotFoundResponse = { message: "The service is not found 503" }

    const stubs = [
        {
            predicates:[{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/createuser" } },
                    { equals: {body: { "firstName": "Virat", "lastName": "Kholi" }}}
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
        }
    ];

    const imposter = {
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