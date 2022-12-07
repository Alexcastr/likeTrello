import { FC, useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';



export interface EntriesState{
 entries: Entry[];
}

interface Props {
 children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
 entries: [
  {
    _id:uuidv4(),
    description: 'Pendientes: y the readable content of a page when looking at its layout. The po',
    status: 'pending',
    createdAt: Date.now(),
  },
  {
    _id:uuidv4(),
    description: 'In-progress: y the readable content of a page when looking at its layout. The po',
    status: 'in-progress',
    createdAt: Date.now() - 1000000,
  },
  {
    _id:uuidv4(),
    description: 'Finished: lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
    status: 'finished',
    createdAt: Date.now() - 1000000,
  },
  
 
 ],
}

export const EntriesProvider:FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

const addNewEntry=(description: string) =>{

  const newEntry : Entry ={
    _id:uuidv4(),
    description: description,
    createdAt: Date.now(),
    status: 'pending',

  }
  dispatch({type: '[Entry] Add-Entry', payload: newEntry})
} 
// puede esperar solo el id pero por si acaso le pasamos el entry completo, para actualizarlo
const updateEntry=(entry: Entry) =>{
  dispatch({type: '[Entry] Entry-updated', payload: entry})
}

return (
 <EntriesContext.Provider value={{
  ...state,
  //methods
  addNewEntry,
  updateEntry,
 }}>
  {children}
 </EntriesContext.Provider>
)
}
