
import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIcontext } from '../../context/ui';

import { dateFunctions } from '../../utils';



interface Props{
  entry: Entry
}

export const EntryCard:FC<Props> = ({entry}) => {

  const {startDragging, endDragging} = useContext(UIcontext);
  const router = useRouter()

  const onDragStart = (event:DragEvent)=>{
    event.dataTransfer.setData('text', entry._id);
    //El elemento lo vamos a dejar caer en el entryList
    startDragging();
  }
  const onDragEnd= (event:DragEvent)=>{
    endDragging();
  }
  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }
  function handleTime(){
    const date = Date.now();
    const minutes = Math.floor((date - entry.createdAt) / 60000);
    
    return `${minutes}`;
  }

  return (
   <Card
   onClick={onClick}
    sx={{ marginBottom: 1 }}
    // Eventos de drag and drop
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
   >
    <CardActionArea>
     <CardContent>
      <Typography sx={{ whiteSpace: "pre-line" }}></Typography>
      {entry.description}
     </CardContent>

     <CardActions
      sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
     >
      <Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
     </CardActions>
    </CardActionArea>
   </Card>
  );
}