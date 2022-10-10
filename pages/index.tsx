import type { NextPage } from 'next'
import {Typography} from '@mui/material'
import { Layout } from '../components/layouts';


const Home: NextPage = () => {
  return (
    <Layout title='Liketrello begin'>
      <Typography>Hola mundo</Typography>
    </Layout>
   
  )
}

export default Home
