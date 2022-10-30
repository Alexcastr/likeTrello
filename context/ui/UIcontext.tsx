import {createContext} from 'react'

interface ContextProps{
sidemenuOpen: boolean;
}

export const UIcontext = createContext({} as ContextProps)