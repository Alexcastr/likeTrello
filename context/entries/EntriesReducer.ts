import { EntriesState } from './';

type EntriesActionType = | {type: '[Entries] - ActionName'}

//entries reducer lo ponemos en miniscupa por que es una función, no es componente
export const entriesReducer = (state:EntriesState, action: EntriesActionType): EntriesState=>{

 switch (action.type) {
  // case '[{Entries] - ActionName':
  //  return {
  //   ...state,
  //  }

  default:
   return state;
 }
}