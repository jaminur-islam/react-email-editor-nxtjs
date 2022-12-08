
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../prismaClient/prismaClient'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const templated =req.body.data
    const response = await db.EmailTem.upsert({
      where: {
        id:templated?.id || Number(""),
      },
      update: {
        emailTem:JSON.stringify(templated)
      },
      create: {
        emailTem:JSON.stringify(templated)
      }
    })
    res.status(200).json("good")
  } catch(err) {
    console.log(err.message)
    res.send(err.message)
  }
}
