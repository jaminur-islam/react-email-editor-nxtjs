import { rejects } from 'assert';
import { resolve } from 'path';
import  AWS from "aws-sdk"

const awsConfig = {
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
};

const SES = new AWS.SES(awsConfig);
const createTem = (templated) =>{
    const param = {
        "Template": {
          "TemplateName": "MyTemplate",
          "SubjectPart": "Greetings, {{name}}!",
          "HtmlPart": `${templated}`,
          "TextPart": "Dear {{name}},\r\nYour favorite animal is {{favoriteanimal}}."
        }
      }

      return new Promise((resolve , reject)=>{
        SES.createTemplate(param, (err, data) =>  {
            if (err) reject(err); // an error occurred
            else resolve(data);           // successful response
          });
      })  
}



const deleteTem = () =>{
      return new Promise((resolve , reject)=>{
        SES.deleteTemplate({TemplateName: "MyTemplate"}, (err, data) =>  {
            if (err) reject(err); // an error occurred
            else resolve(data);           // successful response
          });
      })  
}

export {createTem , deleteTem}