import { FC, useReducer } from 'react';
import { UIcontext, uiReducer } from './';


interface Props {
  children: React.ReactNode;
}

export interface UIState{
  //tipo de dato booleano del estado del menu
  sidemenuOpen: boolean;
}


const UI_INITIAL_STATE: UIState = {
  // estado del menu
  sidemenuOpen: false,
}

export const UIProvider:FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

const openSideMenu = () => {
  dispatch({type: 'UI - Open Sidebar'});
}

const closeSideMenu = () => {
  dispatch({type: 'UI - Close Sidebar'});
}



return (
 <UIcontext.Provider value={{
  ...state,
  openSideMenu,
  closeSideMenu,

 }}>
  {children}
 </UIcontext.Provider>
)
}

