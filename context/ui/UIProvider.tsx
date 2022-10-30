import { FC, useReducer } from 'react';
import { UIcontext, uiReducer } from './';

export interface UIState{
 sidemenuOpen: boolean;
}

interface Props {
 children: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
 sidemenuOpen: false,
}

export const UIProvider:FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

return (
 <UIcontext.Provider value={{
  sidemenuOpen: false
 }}>
  {children}
 </UIcontext.Provider>
)
}
