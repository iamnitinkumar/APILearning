const mbHelper = require('./mountebankHelper');
const settings = require('./settings');

function addService() {
    const response = { message: "Successful Login" }

    const stubs = [
        {
            predicates: [ {
                equals: {
                    method: "POST",
                    "path": "/user/auth/login"
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                        }
                    }
                ]
            }
    ];

    const imposter = {
        port: settings.login_service_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };
