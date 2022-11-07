import {useContext} from 'react';

import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIcontext } from '../../context/ui';

const menuItems:string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'] 

export const Sidebar = () => {

  const {sidemenuOpen, closeSideMenu} = useContext(UIcontext)

  return (
   <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
    <Box sx={{ width: 250 }}>
     <Box sx={{ padding: "5px 10px" }}>
      <Typography variant="h4">Menu</Typography>
     </Box>

     <List>
      {menuItems.map((text, index) => (
       <ListItem button key={text}>
        <ListItemIcon>
         {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
       </ListItem>
      ))}
     </List>
     <Divider />
     <List>
      {menuItems.map((text, index) => (
       <ListItem button key={text}>
        <ListItemIcon>
         {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
       </ListItem>
      ))}
     </List>
    </Box>
   </Drawer>
  );
}
