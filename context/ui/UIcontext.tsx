import { createContext } from "react";

interface ContextProps {
 sidemenuOpen: boolean;
 isAddingEntry: boolean;
 isDragging: boolean;

 // metodos para abrir y cerrar el menu
 openSideMenu: () => void;
 closeSideMenu: () => void;

 setIsAddingEntry: (isAdding: boolean) => void;

 startDragging: () => void;
 endDragging: () => void;
}

export const UIcontext = createContext({} as ContextProps);
