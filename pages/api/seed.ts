import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { Entry } from '../../models'
import { seedData } from '../../database';

type Data = {
  message: string
}

// tener cuidado con este tipo de endpoints, solo se deben usar en desarrollo no en produccion asi que no hay que subirlo
export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  if(process.env.NODE_ENV === 'production'){
    return res.status(401).json({message: 'No tiene acceso a este endpoint'})
  }

  await db.connect()
  // en este punto hacemos la interacción con la bd

  await Entry.deleteMany()
  await Entry.insertMany(seedData.entries)
  await db.disconnect()



  res.status(200).json({ message: 'proceso realizado correctamente' })
}