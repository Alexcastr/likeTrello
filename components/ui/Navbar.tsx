import { useContext } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon  from "@mui/icons-material/MenuOutlined"

import { UIcontext } from "../../context/ui";

export const Navbar = () => {

const {openSideMenu}= useContext(UIcontext)


  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
        size='large'
        edge='start'
        onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <Typography variant='h5'>Liketrello</Typography>
      </Toolbar>
    </AppBar>

  )
}
