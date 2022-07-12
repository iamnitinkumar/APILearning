const mbHelper = require('./mountebankHelper');
const settings = require('./settings');

function addService() {
    const successResponse = { message: "Successful Login" }
    const unauthorisedResponse = { message: "User is not authorised to make the request" }
    const unauthenticatedResponse = { message: "Authentication information is missing or invalid" }
    const serviceUnavailableResponse = { message: "Service not available" }
    const serviceNotFoundResponse = { message: "The service is not found" }

    const stubs = [
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/user/auth/login" } },
                    { equals: {body: { "username": "test", "password": "test" }}}
                ]
            }],
            responses: [{
                is: {
                    statusCode: 201,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(successResponse)
                }
            }]
        },
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/user/auth/login" } },
                    { equals: {body: { "username": "unauthorised", "password": "unauthorised" }}}
                ]
            }],
            responses: [{
                is: {
                    statusCode: 403,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(unauthorisedResponse)
                }
            }]
        },
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/user/auth/login" } },
                    { equals: {body: { "username": "unauthenticated", "password": "unauthenticated" }}}
                ]
            }],
            responses: [{
                is: {
                    statusCode: 401,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(unauthenticatedResponse)
                }
            }]
        },
        {
            predicates: [{
                and: [{
                    not: {
                        or: [
                            {equals: {method: "POST", path: "/user/auth/login"}},
                        ]
                    }
                },
            ]
            }],
            responses: [{
                is: {
                    statusCode: 503,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(serviceUnavailableResponse)
                }
            }]
        }
    ]

    const imposter = {
        port: settings.login_service_port,
        protocol: 'http',
        stubs: stubs,
        defaultResponse: {
            "statusCode": 404,
            "headers": {
                "connection": "close"
            },
            body: JSON.stringify(serviceNotFoundResponse)
          }
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };