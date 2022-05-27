import React, { useState, useEffect } from 'react'
import Header from '../shared/header/Header'
import Mood from '../shared/mood/Mood';
import './Home.css'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../services/firebase';
import { Container, TextField, Grid, Button, Typography, Skeleton, CardContent, IconButton, CardHeader, Avatar, Divider } from '@mui/material';
import firebase from 'firebase/compat/app';
import MoodDataService from "../../services/mood.service";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import BottomBar from '../shared/bottom-bar/bottom-bar';
import Card from '@mui/material/Card';

function Home() {

  const [moods, setMoods] = useState();
  const [input, setInput] = useState("");
  const skeletonNumber = [{ id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }];

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <Grid item xs={12} key={index} >
              <Card elevation={0} sx={{ borderRadius: '5px' }}>
                <CardHeader
                  avatar={<Skeleton variant="circular" width={40} height={40} />}
                  action={
                    <IconButton aria-label="settings">
                      <Skeleton variant="circular" width={24} height={24} />
                    </IconButton>
                  }
                  title={<Skeleton variant="text" width={80} />}
                  subheader={<Skeleton variant="text" width={40} />}
                />
                <CardContent >
                  <Typography variant="body2" color="text.primary">
                    {<Skeleton variant="text" width={200} />}
                  </Typography>
                </CardContent>
                <Grid container spacing={2} justifyContent={'center'}
                  alignItems={'center'}>
                  <Grid item xs={12} mr={2} ml={2} textAlign="center">
                    <Divider />
                  </Grid>
                  <Grid item xs mb={2} ml={2}>
                    <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{ width: '100%' }} type='text' />
                  </Grid>
                  <Grid item mb={2} ml={1} mr={2}>
                    <Button variant="outlined" type='submit' size="small">Share</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
      </>
    );
  };

  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      window.location.reload();
    }
    retrieveMoods();
    console.log(moods)
  }, []);


  const shareMood = (e) => {
    e.preventDefault();
    // db.collection("mood").add({
    //   userId: 'Victor',
    //   message: input,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
    // })
    const data = {
      userId: currentUser.id,
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
    const data = {
      userId: currentUser.id
    }
    MoodDataService.findByFollowing(data)
      .then(response =>
        setMoods(response.data.map((e) => ({
          id: e.id,
          message: e.message,
          createdAt: e.createdAt,
          username: e.user.username,
          userId: e.userId,
          profilImg: e.user.profilImg
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
      <Container maxWidth="sm">
        <Card sx={{ marginTop: "15px", borderRadius: '5px' }} elevation={0}>
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
          mt={1}
          container
          rowSpacing={2}
          justifyContent={'center'}
          alignItems={'center'}
          style={{ borderRadius: '10px' }}
        >

          {
            moods ? (
              moods.map(({ id, message, userId, username, profilImg, createdAt }) => (
                <Grid item xs={12} key={id} >
                  <Mood
                    id={id}
                    message={message}
                    username={username}
                    userId={userId}
                    createdAt={createdAt}
                    profilImg={profilImg}
                  />
                </Grid>
              ))
            )
              :
              (
                <ListSkeleton listsToRender={10} />
              )
          }
        </Grid>
      </Container>
      <BottomBar username={currentUser && currentUser.username} />
    </div>
  )
}

export default Home

