
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../prismaClient/prismaClient'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const templated =req.body.data
    const response = await db.EmailTem.findMany()
    res.status(200).json(response)
  } catch(err) {
    console.log(err)
    res.send(err.message)
  }
}
