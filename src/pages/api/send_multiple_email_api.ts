// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendEmailOnAws, sendMultipleEmailOnAws  } from '../../utils/sentEmailOnAws';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createTem, deleteTem} from '../../utils/createAndDeleteTemplate';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {senderEmail , destination ,templated }=req.body.data
    
    const temName = await createTem(templated)
    console.log("tem" , temName) 
    // multi user send email 
    const response =  await sendMultipleEmailOnAws("MyTemplate", senderEmail, destination); 
    console.log("res" ,response) 
   
    const delTem = await deleteTem()
    console.log("del" , delTem)

    res.status(200).json("nice")
  } catch(err) {
    console.log(err)
    res.send(err.message)
    const delTem = await deleteTem()
    console.log("del" , delTem)
  }
}
