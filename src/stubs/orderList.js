const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings.js');
function showOrderList() {
    const successResponse = { message: "successful operationl" }
    const unauthorizedResponse = { message: "User is not authorised to make the request" }
    const unauthenticatedResponse = { message: "Authentication information is missing or invalid" }
    const serviceUnavailableResponse = { message: "Service not available" }
    const methodNotAllowed = { message: "Please change the HTTP method"}  
    const getOrderList = { response:
        [{
            itemid: "Integer",
            itemname: "String",
            quantity: "Integer"   
        }
    ]};
    const stubs = [
        {
            predicates: [{
                and:[                   
                        {equals: { headers: {"Authorization": "Basic TG9rZW5kZXI6UXdlcnR5QDIy"}}},
                        { equals: { method: "GET" }},
                        { equals: { "path": "/orders" }}        
                    ]
                }],
            responses: [
                {
                    is:
                    {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(getOrderList)
                    }
                }]
            },
        {
            predicates: [{
                and:[
                        { not: {equals: { method: "GET" }}},
                        { equals:{path:"/orders"}}
                    ]
                }],
            responses: [
                {
                    is:
                    {
                        statusCode: 405,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(methodNotAllowed)
                    }
                }]
            },
        {
            predicates: [{
                and:[
                        { equals: { method: "GET" }},
                        { equals: { "path": "/orders" }}, 
                        { equals: { headers: {"Authorization": "Basic QXJjaGFuYTpRd2VydHlAMjI="}}},                      
                    ]
            }],
            responses: 
                [{
                    is: 
                    {
                        statusCode: 401,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(unauthorizedResponse)
                    }
                }]
            },
        {
            predicates: [{
                and: 
                    [{
                        or: 
                        [
                            {not:{equals: { headers: {"Authorization": "Basic TG9rZW5kZXI6UXdlcnR5QDIy"}}}},
                            {not:{equals: { headers: {"Authorization": "Basic QXJjaGFuYTpRd2VydHlAMjI="}}}}
                        ]
                                            
                },
                { equals: { method: "GET" }},
                { equals: { "path": "/orders" }}    
            
            ]}],
                responses: 
                    [{
                        is: 
                        {
                            statusCode: 403,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(unauthenticatedResponse)
                        }
                    }]
                }
        ];
    const imposter = {
        name: "Get Order list",
        port: settings.orderlist_service_port,
        protocol: 'http',
        stubs: stubs,
        defaultResponse: {
            "statusCode": 503,
            "headers": {
                "connection": "close"
            },
            body: JSON.stringify(serviceUnavailableResponse)
          }
    };
    return mbHelper.postImposter(imposter);
}
module.exports = { showOrderList };