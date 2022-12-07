import { FC, useReducer } from 'react';
import { UIcontext, uiReducer } from './';


interface Props {
  children: React.ReactNode;
}

export interface UIState{
  //tipo de dato booleano del estado del menu
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}


const UI_INITIAL_STATE: UIState = {
  // estado del menu
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

export const UIProvider:FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

const openSideMenu = () => {
  dispatch({type: 'UI - Open Sidebar'});
}

const closeSideMenu = () => {
  dispatch({type: 'UI - Close Sidebar'});
}

const setIsAddingEntry = (isAdding: boolean) => {
  dispatch({type: 'UI - Set isAddingEntry', payload: isAdding});
}

const startDragging= () => {
  dispatch({type: 'UI - Start Dragging'});
}

const endDragging= () => {
  dispatch({type: 'UI - End Dragging'});
}

return (
 <UIcontext.Provider value={{
  ...state,
  openSideMenu,
  closeSideMenu,

  setIsAddingEntry,
  
  startDragging,
  endDragging,

 }}>
  {children}
 </UIcontext.Provider>
)
}

