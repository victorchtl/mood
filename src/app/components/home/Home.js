import React, { useState, useEffect } from 'react'
import Header from '../shared/header/Header'
import Mood from '../shared/mood/Mood';
import './Home.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../services/firebase';
import { Container, TextField, Grid, Button } from '@mui/material';

function Home() {

  const [moods, setMoods] = useState([]);

  useEffect(() => {
    db.collection("mood").onSnapshot((querySnapshot) =>
      setMoods(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      ));
    console.log(moods);
  }, []);

  return (
    <div className='home'>
      <Header />
      <Container maxWidth="md">
        <Grid
          mt={2}
          container

          justifyContent={'center'}
          alignItems={'center'}
          style={{ background: 'white', borderRadius: '10px' }}
        >

          <Grid item xs m={2}>
            <TextField id="outlined-basic" label="Mood" variant="outlined" sx={{ width: '100%' }} />
          </Grid>

          <Grid item m={2}>
            <Button variant="outlined">Share</Button>
          </Grid>

        </Grid>

        <Grid
          mt={2}
          container
rowSpacing={2}
          justifyContent={'center'}
          alignItems={'center'}
          style={{ borderRadius: '10px' }}
        >
          {moods.map(({ id, data: { message, user } }) => (
            <Grid item xs={12} mt={2} p={2} style={{ background: 'white'}} key={id}>
              <Mood
                key={id}
                message={message}
                user={user}
              />
            </Grid>
          ))}



        </Grid>

      </Container>
    </div>
  )
}

export default Home