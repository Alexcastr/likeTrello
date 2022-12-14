
import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry, IEntry } from '../models';

export const getEntryById = async (id: string):Promise<IEntry | null> => {
  // aqui vamos a hacer la validación de que el id sea un objectId de mongo
  if(!isValidObjectId(id)) return null;

  await db.connect()
  // el lean trae la minima información de la base de datos para trabajar
  const entry = await Entry.findById(id).lean()
  await db.disconnect()
  // el JSON.parse(JSON.stringify(entry)) es para que no se quede con el _id de mongo y quite el problema de serialización
  return JSON.parse(JSON.stringify(entry))
}
