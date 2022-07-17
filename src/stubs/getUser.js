const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings.js');

function addService() {
    const successResponse = { message: "Successfully retrieved the user details" }
    const unauthorisedResponse = { message: "User is not authorised to make the request" }
    const unauthenticatedResponse = { message: "Authentication information is missing or invalid" }
    const serviceUnavailableResponse = { message: "Service not available" }
    const serviceNotFoundResponse = { message: "The service is not found" }
    const getUserBody = { response:[ {
        First_Name: "Archana",
        Last_Name: "Bhardwaj",
        DOB: "6 Nov",
        Phone: "8588896008"
    }
]};



    const stubs = [
        {
            predicates: [{
                and: [
                    { equals: { method: "GET" } },
                    {not : {equals:{path:"/users"}}}
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
        ,{
            predicates: [ {
                and: [
                    { equals: { method: "GET" } },
                    { startsWith: { "path": "/users" } },
                    {equals: {headers:{"authenticated":true}}}
                    
                ]
            }],
            responses: [
                {

                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                            
                        },
                        body: JSON.stringify(getUserBody)
                        }
                    }
                ]
            },
            {
            predicates: [ {
                and: [
                    { equals: { method: "GET" } },
                    { startsWith: { "path": "/users" } },
                    {equals: {headers:{"authenticated":false}}}
                    
                ]
            }],
            responses: [
                {

                    is: {
                        statusCode: 401,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(unauthenticatedResponse)
                        }
                    }
                ]
            },
            {
                predicates: [ {
                    and: [
                        { equals: { method: "GET" } },
                        { startsWith: { "path": "/users" } },
                        {equals: {headers:{"Authorization":false}}}
                       
                    ]
                }],
                responses: [
                    {
    
                        is: {
                            statusCode: 403,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(unauthorisedResponse)
                            }
                        }
                    ]
                }
      
    ];

    const imposter = {
        name: "Get user list",
        port: settings.get_user_port,
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