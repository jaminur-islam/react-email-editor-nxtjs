// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { email } from '../../utils/sentEmailOnAws';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const {senderEmail ,receiverEmailList ,templated }=req.body.data
  //  const response =  await sendEmailOnAws(senderEmail , receiverEmailList , templated);
    // console.log(response) 
  await email()
   
  res.status(200).json({ name: 'good job' })
  } catch(err) {
    console.log(err)
    res.send(err.message)
  }
}
