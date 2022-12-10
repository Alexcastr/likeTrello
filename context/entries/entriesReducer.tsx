import { Entry } from '../../interfaces';
import { EntriesState } from '.';

type EntriesActionType = 
| {type: '[Entry] Add-Entry', payload:Entry  }
| {type: '[Entry] Entry-updated', payload:Entry  }
| {type: '[Entry] Resfresh-data', payload:Entry[] }

//entries reducer lo ponemos en miniscupa por que es una función, no es componente
export const entriesReducer = (state:EntriesState, action: EntriesActionType): EntriesState=>{

 switch (action.type) {
  case '[Entry] Add-Entry':
    return{
      ...state,
      entries: [...state.entries, action.payload]
    }
    // case '[Entry] Delete-Entry':
    //   return{
    //     ...state,
    //     entries: state.entries.filter(entry => entry._id !== action.payload)
    //   }
    case '[Entry] Entry-updated':
      return{
        ...state,
        entries: state.entries.map(entry => {
          if(entry._id === action.payload._id){
            // si el id del entry es igual al id de la entrada que viene del payload, entonces actualizamos el estado y la descripción por el que venga de afuera
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        })
      }

    case '[Entry] Resfresh-data':
      return{
        ...state,
        entries: [...action.payload]
      }

  default:
   return state;
 }
}