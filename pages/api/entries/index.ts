import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'


// o luce de esta manera la respuesta o de esta otra...
type Data = 
| {message: string}
| IEntry[]
| IEntry



export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  switch(req.method){
    case 'GET':
      return getEntries(res)
    
    case 'POST':
      // la req viene con el body que tiene la data
      return createEntry(req, res)
    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
  

}


const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect()
    const entries = await Entry.find({}).sort({ createdAt: 'ascending' })
    await db.disconnect()
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener de la bd' })
  }
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {  description= '' } = req.body

 const newEntry = new Entry({ description, createdAt: Date.now()  })

  try {
    await db.connect()
    await newEntry.save()
    await db.disconnect()
    return res.status(201).json(newEntry)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' })
  }

}

