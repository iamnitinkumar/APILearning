const mbHelper=require('./mountebankHelper');
const setting = require('./settings');


function addService(){
    const response = { message:'Hello world'}
    
    const stubs =[
        {
            perdicates :[
                {
                    equals:{
                        method: "GET",
                        "path": "/"
                    }
                }
            ],
            responses:[
                {
                    is:{
                        statusCode: 200,
                        headers:{
                            "Content-Type":"application/json"

                        },
                        body: JSON.stringify(response)

                    }
                }
            ]
        }
    ];
    const imposter ={
        port: setting.dummy_port,
        protocol: 'http',
        stubs:stubs
    };
    return mbHelper.postImposter(imposter);
}
module.exports = { addService };