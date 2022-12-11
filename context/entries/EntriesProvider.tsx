import { FC, useReducer, useEffect } from 'react';
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

const addNewEntry= async (description: string) =>{
  const {data} = await entriesApi.post<Entry>('/entries', {description})

  dispatch({type: '[Entry] Add-Entry', payload: data})
} 
// puede esperar solo el id pero por si acaso le pasamos el entry completo, para actualizarlo
const updateEntry= async ({ _id,description, status}:Entry) =>{
  try {
    // const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`, entry)  se puede hacer así pero no es recomendable, porque es menos optimo, porque estamos enviando todo el objeto, cuando solo necesitamos el id, el status y la descripción
    const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {status: status, description: description})
    dispatch({type: '[Entry] Entry-updated', payload: data})
  } catch (error) {
    console.log(error)
  }
  
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
