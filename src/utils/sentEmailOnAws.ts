import  AWS from "aws-sdk"
import { ListTemplatesCommand } from "@aws-sdk/client-ses";
import { resolve } from "path";
import { rejects } from "assert";

const awsConfig = {
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
};



const SES = new AWS.SES(awsConfig);



/*   const params = {
  "Template": {
    "TemplateName": "MyTemplate2",
    "SubjectPart": "Greetings, {{name}}!",
    "HtmlPart": ``
  } */





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
  


  /* SES.createTemplate(params, (err, data) =>  {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
 */

  /* 
  ses.updateTemplate(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
  */

  /* SES.sendTemplatedEmail(params, (err, data) =>  {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  }); */

  /* SES.listTemplates({MaxItems: 2 , NextToken: null}, (err , data)=>{
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data); 
  }) */

   
  

  /* SES.deleteTemplate({TemplateName:"MyTemplate"}, (err , data)=>{
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data); 
  })
   */

  
} 






export {email}








/* const sendEmailOnAws = async (senderEmail:string , emailList :[], templated : string , ) => {
  try {
    const params = {
      Source: senderEmail,
      Destination: {
        ToAddresses: emailList
      },
      Message: {
        Subject: {
          Data: `OTP Verification`,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: templated,
          },

          Text: {
            Charset: "UTF-8",
            Data: "Hello Charith Sample description time 1517831318946"
          }
        },
      },
    };

    const emailSent = await SES.sendEmail(params).promise();
    return emailSent

    
  } catch (err) {
    throw new Error(err.message)
  }
};


export { sendEmailOnAws } */