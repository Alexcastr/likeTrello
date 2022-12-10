import { FC, useReducer, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import {entriesApi} from '../../apis';



export interface EntriesState{
 entries: Entry[];
}

interface Props {
 children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
 entries: [],
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

const refreshEntries = async () => {
  const {data} = await entriesApi.get<Entry[]>('/entries')
  dispatch({type: '[Entry] Resfresh-data', payload: data})
}

useEffect(() => {
  refreshEntries()
}, [])

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
