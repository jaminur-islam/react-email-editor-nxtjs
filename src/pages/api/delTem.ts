
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../prismaClient/prismaClient'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id =req.body.data.id

    const response = await db.EmailTem.delete({
        where: {
            id
        }
    })
    res.status(200).json(response)
  } catch(err) {
    console.log(err)
    res.send(err.message)
  }
}
