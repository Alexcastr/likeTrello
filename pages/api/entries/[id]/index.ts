import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

import {db} from '../../../../database'
import { Entry, IEntry} from '../../../../models'


type Data = 
  | { message: string }
  | IEntry


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query

  // validación por si el id no es valido antes de hacer la consulta en la bd
  if(!mongoose.isValidObjectId(id)){

    return res.status(400).json({ message: `Id no valido ${id} ...`})
  }
  switch(req.method){
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }

}

const getEntry = async (req:NextApiRequest, res:NextApiResponse)=>{
  const { id } = req.query

  await db.connect()
  const entryInDb = await Entry.findById(id)
  await db.disconnect()
  if(!entryInDb){
    
    return res.status(400).json({message: 'No hay entrada con ese id' + id})
  }
  await db.disconnect()
  return res.status(200).json(entryInDb)
  
}

const deleteEntry = async (req:NextApiRequest, res: NextApiResponse<Data>)=>{
  const { id } = req.query

  await db.connect()
  const entryInDb = await Entry.findById(id)
  await db.disconnect()
  if(!entryInDb){
    return res.status(400).json({message: 'No hay entrada con ese id' + id})
  }

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id)
    await db.disconnect()
    res.status(200).json(deletedEntry!)
  } catch (error: any) {
    console.log(error)
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    await db.connect()
    // Entry importar de los modelos
    const entryToUpdate = await Entry.findById(id)
    // si no existe el registro
    if(!entryToUpdate){
      await db.disconnect();
      return res.status(400).json({message: 'No hay entrada con ese id' + id})
    }
    // si viene el registro y el status se actualiza, y sino se deja el que ya tiene
    const { 
      description = entryToUpdate.description,
      status = entryToUpdate.status
    } = req.body
    // runValidators: true para que corra las validaciones del modelo y new: true para que devuelva el registro actualizado
    try {
      const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
      await db.disconnect();
      // updateEntry no puede ser null por eso el !
      res.status(200).json( updatedEntry! );
      // esta es otra forma que se podria hacer cualquiera de las dos funciona
      // entryToUpdate.description = description;
      // entryToUpdate.status = status;
      // await entryToUpdate.save();
      
  } catch (error: any) {
    console.log(error)
      await db.disconnect();
      res.status(400).json({ message: error.errors.status.message });
  }
}