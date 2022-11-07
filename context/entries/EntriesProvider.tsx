import { FC, useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import { Entry } from '../../interfaces';
import { Entriescontext, entriesReducer } from './';



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
    description: 'y the readable content of a page when looking at its layout. The po',
    status: 'pending',
    createdAt: Date.now(),
  },
  {
    _id:uuidv4(),
    description: 'y the readable content of a page when looking at its layout. The po',
    status: 'in-progress',
    createdAt: Date.now() - 1000000,
  },
  {
    _id:uuidv4(),
    description: 'lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
    status: 'finished',
    createdAt: Date.now() - 1000000,
  },
  
 
 ],
}

export const EntriesProvider:FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

return (
 <Entriescontext.Provider value={{
  ...state,
 }}>
  {children}
 </Entriescontext.Provider>
)
}
