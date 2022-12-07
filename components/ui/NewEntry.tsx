import { ChangeEvent, useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlineIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {EntriesContext} from '../../context/entries'
import {UIcontext} from '../../context/ui'

export const NewEntry = () => {

const { addNewEntry } = useContext(EntriesContext);

const { isAddingEntry, setIsAddingEntry } = useContext(UIcontext);


 const [inputValue, setInputValue] = useState("");
 const [touch, setTouch] = useState(false);

 const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
  setInputValue(event.target.value);
 };

 const onSave = () => {
  if(inputValue.length === 0 ) return;

  addNewEntry(inputValue);
  setIsAddingEntry(false);
  setInputValue("");
  setTouch(false);


 }

 return (
  <Box sx={{ marginBottom: 2, paddingX: 2 }}>
   {isAddingEntry ? (
    <>
     <TextField
      fullWidth
      sx={{ marginTop: 2, marginBottom: 1 }}
      placeholder="Nueva entrada"
      autoFocus
      multiline
      label="Nueva entrada"
      helperText={inputValue.length <= 0 && touch && "Ingrese un valor"}
      error={inputValue.length <= 0 && touch}
      value={inputValue}
      onChange={onTextFieldChanges}
      //onblur es cuando pierde el foco
      onBlur={() => setTouch(true)}
     />
     <Box display="flex" justifyContent="space-between">
      <Button variant="text" onClick={() => setIsAddingEntry(false)}>
       Cancelar
      </Button>
      <Button
       variant="outlined"
       color="secondary"
       endIcon={<SaveOutlineIcon />}
       onClick={onSave}
      >
       Guardar
      </Button>
     </Box>
    </>
   ) : (
    <Button
     startIcon={<AddCircleOutlineOutlinedIcon />}
     fullWidth
     variant="outlined"
     onClick={() => setIsAddingEntry(true)}
    >
     Agregar tarea
    </Button>
   )}
  </Box>
 );
};
