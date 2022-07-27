const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings.js');
function addUserService() {
    const successResponse = { message: "Successfully retrieved the user details" };
    const unauthorisedResponse = { message: "User is not authorised to make the request" };
    const unauthenticatedResponse = { message: "Authentication information is missing or invalid" };
    const serviceUnavailableResponse = { message: "Service not available" };
    const serviceNotFoundResponse = { message: "The service is not found" };
    const MethodNotAllowed = { message: "Please change the HTTP method"};
    const getUserBody = { 
        response:[{
        First_Name: "Keth",
        Last_Name: "Joe",
        DOB: "10 Nov",
        Phone: "858889697"
       }
    ]};
    const stubs = [
       {
        // user details is retrieved successfully
            predicates: [{
                and:[
                    {equals: {method: "GET"}},
                    {equals: {"path": "/users"}},
                    {equals:{headers:{Authorization:"Basic QXJjaGFuYToxMjM0"}}}
                    ]
                }],
            responses: [{
                is: {
                    statusCode: 200,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(getUserBody)
                    }
                }]
       },
        {
            predicates: [{
                and:[
                    { equals: {method: "GET"}},
                    { equals: {"path": "/users"}},
                    {equals:{headers:{Authorization:"Basic TWFudmlrazoxMjM0"}}}
                    ]
                }],
            responses: [{
                is: {
                    statusCode: 401,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(unauthenticatedResponse)
                    }
                    }]
        },
        {
            predicates: [{
                and:[
                    { equals: {method: "GET"}},
                    { equals: {"path": "/users"}},
                    {equals:{headers:{Authorization:"Basic Q2hhcmxpZToxMjM0"}}}  
                    ]
                }],
            responses: [{
                is: {
                    statusCode: 403,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(unauthorisedResponse)
                    }
                   }]
        },
        {
            predicates: [{
                or: [
                    {not:{ equals: { method: "GET" }}}, //F
                    {not:{equals:{path:"/users"}}}, //T
                    {equals:{headers:{Authorization:"Basic QXJjaGFuYToxMjM0"}}}
                    ]         
                }],
            responses: [{
                
                is: {
                    statusCode: 405,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(MethodNotAllowed)
                    }
                    }]
        } 
    ];
    const imposter = {
        name: "Get user list",
        port: settings.user_service_port,
        protocol: 'http',
        stubs: stubs,
        defaultResponse: {
            statusCode: 503,
            headers: {"connection": "close"},
            body: JSON.stringify(serviceUnavailableResponse)
          }
    };
    return mbHelper.postImposter(imposter);
}
module.exports = {addUserService};