import  AWS from "aws-sdk"

const awsConfig = {
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
};

const SES = new AWS.SES(awsConfig);
//============================= Send multiple Email =======================================//
const sendMultipleEmailOnAws = async (temName:string, senderEmail:string , destination: []) => {

  //  console.log(senderEmail , emailList , templated)

  try {
   const params = {
      "Source":`jaminur islam <${senderEmail}>`,
      "Template":`${temName}`,
      "Destinations": destination,
      "DefaultTemplateData":"{ \"name\":\"friend\", \"favoriteanimal\":\"unknown\" }"
    }
    

    const emailSent = await SES.sendBulkTemplatedEmail(params).promise();
    return emailSent

    
  } catch (err) {
    throw new Error(err.message)
  }
};

//============================= Send single Email ==========================================//
const sendEmailOnAws = async (senderEmail:string , emailList :[], templated : string , ) => {

  //  console.log(senderEmail , emailList , templated)

  try {
  const params = {
    "Source":`jaminur islam <${senderEmail}>`,
    "Destination": {
      "ToAddresses": emailList,
    },
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: "UTF-8",
          Data: templated,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello Charith Sample description time 1517831318946"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email"
      }
    },
  }
    
    const emailSent = await SES.sendEmail(params).promise();
    return emailSent

    
  } catch (err) {
    throw new Error(err.message)
  }
};


export { sendMultipleEmailOnAws ,sendEmailOnAws  } 























/* 








/*   const params = {
  "Template": {
    "TemplateName": "MyTemplate2",
    "SubjectPart": "Greetings, {{name}}!",
    "HtmlPart": ``
  } 


  const params = {
    "Source": "sheikhanikbd@gmail.com",
    "Template": "MyTemplate",
    "Destination": {
      "ToAddresses": ["jaminurislam250@gmail.com"]
    },
    "TemplateData": JSON.stringify({name:"sagor", email:"sagor@gmail.com"})
  }
  
  
  
   const email = async () =>{
  
    return new Promise((resolve , rejects)=>{
      SES.getTemplate({TemplateName:"MyTemplate"} , async (err , data)=>{
        if (err) console.log(err, err.stack); // an error occurred
        else  resolve(data)
      })
    
  
    })
    
  
  
    SES.createTemplate(params, (err, data) =>  {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
   
  
    
    ses.updateTemplate(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
    
  
  SES.sendTemplatedEmail(params, (err, data) =>  {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    }); 
  
  SES.listTemplates({MaxItems: 2 , NextToken: null}, (err , data)=>{
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data); 
    }) 
  
     
    
  
 SES.deleteTemplate({TemplateName:"MyTemplate"}, (err , data)=>{
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data); 
    })
     
  
    
  } 
  export {email}






*/