import {createContext} from 'react'

interface ContextProps{
sidemenuOpen: boolean;


// metodos para abrir y cerrar el menu
openSideMenu: () => void;

closeSideMenu: () => void;
}

export const UIcontext = createContext({} as ContextProps)