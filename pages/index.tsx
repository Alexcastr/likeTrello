import type { NextPage } from 'next'
import { Grid, Card, CardHeader, CardContent} from '@mui/material'
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';



const Home: NextPage = () => {
  return (
   <Layout title="Home open liketrello">
    <Grid container spacing={2}>
     <Grid item xs={12} sm={4}>
      <Card sx={{ height: "calc(100vh - 100px)" }}>
       <CardHeader title="Pendientes" />
       <CardContent>
       <NewEntry />
        <EntryList status='pending'/>
       </CardContent>
      </Card>
     </Grid>

     <Grid item xs={12} sm={4}>
      <Card sx={{ height: "calc(100vh - 100px)" }}>
       <CardHeader title="En progreso" />
       <CardContent>
        <EntryList status='in-progress'/>
       </CardContent>
      </Card>
     </Grid>

     <Grid item xs={12} sm={4}>
      <Card sx={{ height: "calc(100vh - 100px)" }}>
       <CardHeader title="Completadas" />
       <CardContent>
        <EntryList status='finished'/>
        <EntryList status='finished'/>
        <EntryList status='finished'/>
       </CardContent>
      </Card>
     </Grid>
    </Grid>
   </Layout>
  );
}

export default Home
