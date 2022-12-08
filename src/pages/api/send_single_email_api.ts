import { sendEmailOnAws } from '../../utils/sentEmailOnAws';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {senderEmail ,receiverEmailList ,templated }=req.body.data
    console.log(senderEmail ,receiverEmailList , templated)
      
    // single user send email  
    const response =  await sendEmailOnAws( senderEmail , receiverEmailList , templated);
   
    console.log(response)
    res.status(200).json("nice")
  } catch(err) {
    console.log(err)
    res.send(err.message)
   
  }
}
