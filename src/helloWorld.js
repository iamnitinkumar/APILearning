const mbHelper=require('./mountebankHelper');
const setting= require('./settings');


function addService(){
    const response ={ message:'Hello world'}
    
    const stubs =[
        {
            perdicate :[
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
                        hearders:{
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
        protocal: 'http',
        stubs:stubs
    };
    return mbHelper.postImposter(imposter);
}
module.exports={ addService};