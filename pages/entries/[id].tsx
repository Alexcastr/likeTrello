
import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'


import { Layout } from '../../components/layouts'
import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';

import { dateFunctions } from '../../utils';




interface Props {
  entry: Entry
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage:FC<Props> = ( {entry} ) => {
  
  // no usaremos esta forma porque es mejor que el usuario no sepa que existe esa ruta, mejor usaremos el redirect de next en el getServerSideProps
  // const router = useRouter()
  // if(!props.id) {
  //   router.replace('/entries')
  // }
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touch, setTouch] = useState(false)

  const {updateEntry} = useContext(EntriesContext)

  //vamos a usar un useMemo ya que estamos usando demasiado el {inputValue.length <= 0 && touch } para validar el formulario y no queremos que se vuelva a ejecutar cada vez que cambie el estado
  const isNotValid = useMemo(() => inputValue.length <= 0 && touch, [inputValue, touch])

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    //validamos que el input no este vacio
    if(inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }
    updateEntry(updatedEntry, true)
  }
 return (
  <Layout title={inputValue.substring(0,20) + '...'}>
   <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
    <Grid item xs={12} md={8} lg={6}>
     <Card>
      <CardHeader
       title={`Entrada: `}
       subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
      />
      <CardContent>
       {/* //multiline es para poder editar en varias lineas */}
       <TextField
        sx={{ marginTop: 2, marginBottom: 1 }}
        fullWidth
        placeholder="Nueva entrada"
        autoFocus
        multiline
        label="Nueva entrada"
        value={inputValue}
        onChange={onInputValueChange}
        // se va a mostrar el helpertext si el input esta vacio y se ha tocado, debe ir con el onblur, cuando le mandamos la propiedad error podemos cambiar el color del helpertext
        helperText={isNotValid && "ingrese un valor"}
        onBlur={() => setTouch(true)}
        error={isNotValid}
       />
       {/*RADIO  */}
       <FormControl>
        <FormLabel>Estado: </FormLabel>
        <RadioGroup row value={status} onChange={onStatusChanged}>
         {validStatus.map((option) => (
          <FormControlLabel
           key={option}
           value={option}
           control={<Radio />}
           label={capitalize(option)}
          />
         ))}
        </RadioGroup>
       </FormControl>
      </CardContent>
      <CardActions>
       <Button
        onClick={onSave}
        // si el input esta vacio se deshabilita el boton
        disabled={inputValue.length <= 0}
        startIcon={<SaveOutlinedIcon />}
        variant="contained"
        fullWidth
       >
        Save
       </Button>
      </CardActions>
     </Card>
    </Grid>
   </Grid>

   <IconButton
    sx={{
     position: "fixed",
     bottom: 30,
     right: 30,
     backgroundColor: "error.dark",
    }}
   >
    <DeleteOutlinedIcon />
   </IconButton>
  </Layout>
 );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // para no tener que tipar todo el getServerSideProps, lo haremos solo con el as {id: string}
  const { id } = params as {id: string}


const entry = await dbEntries.getEntryById(id)

  if(!entry){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
 
  return {
    props: {
      // para validar que es un id de mongoDB y sino usamos el useRouter para redireccionar esa es una forma pero se recomienda usar el redirect de next que estara arriba
      entry
    }
  }
}

export default EntryPage;