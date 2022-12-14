import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material"
import MenuOutlinedIcon  from "@mui/icons-material/MenuOutlined"

import { UIcontext } from "../../context/ui";

export const Navbar = () => {

const {openSideMenu}= useContext(UIcontext)


  return (
   <AppBar position="sticky">
    <Toolbar>
     <IconButton size="large" edge="start" onClick={openSideMenu}>
      <MenuOutlinedIcon />
     </IconButton>
     <NextLink href="/" passHref>
      {/* // este link es de material ui */}
      <Link underline="none" color="white">
       <Typography variant="h5">Liketrello</Typography>
      </Link>
     </NextLink>
    </Toolbar>
   </AppBar>
  );
}
