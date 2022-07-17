const mbHelper = require('../utilities/mountebankHelper');
const settings = require('../config/settings');

function addService() {
    const response = { message: "Hello World" }

    const stubs = [
        {
            predicates: [ {
                equals: {
                    method: "GET",
                    "path": "/"
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
        name: "Hello World",
        port: settings.dummy_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };
