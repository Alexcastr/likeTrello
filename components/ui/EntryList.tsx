import { FC, useContext, useMemo, DragEvent } from "react";
import { Paper, List } from "@mui/material";

import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../../context/entries";
import { EntryCard } from "./";
import { UIcontext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
 status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
 const { isDragging, endDragging } = useContext(UIcontext);
 const { entries, updateEntry } = useContext(EntriesContext);
 // cada vez que cambien las entries, se va a volver a ejecutar el useMemo
 const entriesByStatus = useMemo(
  () => entries.filter((entry) => entry.status === status),
  [entries]
 );
 // Funcion que se ejecuta cuando se suelta el elemento y para permitir que se suelte el elemento

 const allowDrop = (event: DragEvent<HTMLDivElement> ) => {
  event.preventDefault();
 };

 const onDropEntry = (event: DragEvent<HTMLDivElement> ) => {
  const id = event.dataTransfer.getData("text");

  // el signo de admiración es para que siempre la vaya a encontrar
  const entry = entries.find((entry) => entry._id === id)!;
  entry.status = status;
  updateEntry(entry)
  endDragging();
 };

 return (
  <div
   // jugamos con las propiedades de css con el drag and drop
   onDrop={onDropEntry}
   onDragOver={allowDrop}
   className={isDragging ? styles.dragging : ""}
  >
   <Paper
    sx={{
     height: "calc(100vh -250px",
     overflow: "scroll",
     backgroundColor: "transparent",
     padding: "2px 5px",
    }}
   >
    <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
     {entriesByStatus.map((entry) => (
      <EntryCard key={entry._id} entry={entry} />
     ))}
    </List>
   </Paper>
  </div>
 );
};
