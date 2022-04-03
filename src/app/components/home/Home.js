import React, { useState, useEffect } from 'react'
import Header from '../shared/header/Header'
import Mood from '../shared/mood/Mood';
import './Home.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../services/firebase';
import { Container, TextField, Grid, Button, Typography } from '@mui/material';
import firebase from 'firebase/compat/app';
import MoodDataService from "../../services/mood.service";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import BottomBar from '../shared/bottom-bar/bottom-bar';
import Card from '@mui/material/Card';

function Home() {

  const [moods, setMoods] = useState([]);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);


  console.log(currentUser)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      window.location.reload();
    }
    retrieveMoods();
  }, []);


  const shareMood = (e) => {
    e.preventDefault();
    // db.collection("mood").add({
    //   userId: 'Victor',
    //   message: input,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
    // })
    const data = {
      userId: currentUser.username,
      userImg: currentUser.profilImg,
      message: input,
    }
    MoodDataService.create(data)
      .then(response => {
        retrieveMoods()
      })
      .catch(e => {
        console.log(e)
      })
    setInput('');
  }

  const retrieveMoods = () => {
    MoodDataService.getAll()
      .then(response =>
        setMoods(response.data.map((e) => ({
          id: e.id,
          user: e.userId,
          userImg: e.userImg,
          message: e.message,
          createdAt: e.createdAt
        })))
      )
      .catch(e => {
        console.log(e);
      });
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  return (
    <div className='home'>
      <Header username={currentUser && currentUser.username} profilImgColor={currentUser && currentUser.profilImg}/>
      <Container maxWidth="sm">
        <Card sx={{marginTop: '20px', borderRadius: '10px'}}>
        <Typography variant="subtitle1" component="div" gutterBottom ml={2} mt={1} color={'text.secondary'}>
        {capitalize("What's up")} {capitalize(currentUser.username)} ?
      </Typography>
          <Grid container justifyContent={'center'} alignItems={'center'}>
            <Grid item xs mr={1} ml={2} mb={2}>
              <TextField id="outlined-basic" label="Mood" variant="outlined" sx={{ width: '100%' }} type='text' value={input} onChange={e => setInput(e.target.value)} />
            </Grid>
            <Grid item mr={2} ml={1} mb={2}>
              <Button variant="outlined" type='submit' onClick={shareMood}>Share</Button>
            </Grid>
          </Grid>
        </Card>
        <Grid
          mt={2}
          container
          rowSpacing={2}
          justifyContent={'center'}
          alignItems={'center'}
          style={{ borderRadius: '10px' }}
        >
          {moods.map(({ id, message, user, userImg, createdAt }) => (
            <Grid item xs={12} key={id} >
              <Mood
                id={id}
                message={message}
                user={user}
                createdAt={createdAt}
                userImg={userImg}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <BottomBar username={currentUser && currentUser.username} />
    </div>
  )
}

export default Home