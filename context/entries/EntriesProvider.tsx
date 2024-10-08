import { FC, useReducer, useEffect } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
 entries: Entry[];
}

interface Props {
 children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
 entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
 const { enqueueSnackbar } = useSnackbar();

 const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

 const addNewEntry = async (description: string) => {
  
console.log("description", description);
  const { data } = await entriesApi.post<Entry>("/entry", { description, status: "pending" });

  console.log("data in add entry", data);
  dispatch({ type: "[Entry] Add-Entry", payload: data });
 };
 // puede esperar solo el id pero por si acaso le pasamos el entry completo, para actualizarlo
 // para que el snackbar no salga en cualquier lado cuando hago un update, le pasamos showSnackbar = false y add una condición en el updateEntry
 const updateEntry = async (
  { _id, description, status }: Entry,
  showSnackbar = false
 ) => {
  try {
   // const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`, entry)  se puede hacer así pero no es recomendable, porque es menos optimo, porque estamos enviando todo el objeto, cuando solo necesitamos el id, el status y la descripción
   
  //  console.log("entry", { _id, description, status });
   const { data } = await entriesApi.put<Entry>(`/entry/${_id}`, {
    status: status,
    description: description,
   });

  //  console.log("data del endpoint", data);
   dispatch({ type: "[Entry] Entry-updated", payload: data });
   if (showSnackbar)
    enqueueSnackbar("Entrada actualizada", {
     variant: "success",
     autoHideDuration: 1500,
     anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  } catch (error) {
   console.log("error in update context", error);
  }
 };

 const refreshEntries = async () => {
  const { data } = await entriesApi.get<Entry[]>("/entries");
  dispatch({ type: "[Entry] Resfresh-data", payload: data });
 };

 const deleteEntry = async (_id: string) => {
  const { data } = await entriesApi.delete<Entry>(`/entry/${_id}`);
  dispatch({ type: "[Entry] Delete-Entry", payload: data });
 };

 useEffect(() => {
  refreshEntries();
 }, [state.entries.length]);

 return (
  <EntriesContext.Provider
   value={{
    ...state,
    //methods
    addNewEntry,
    updateEntry,
    deleteEntry,
   }}
  >
   {children}
  </EntriesContext.Provider>
 );
};

//toDo  poner la notificacion de que se elimino correctamente aqui
