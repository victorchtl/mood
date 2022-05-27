import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Grid, Typography, Avatar } from '@mui/material';
import Card from '@mui/material/Card';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoodDataService from '../../../services/mood.service'
import Mood from '../mood/Mood';
import FollowingDataService from '../../../services/following.service';
import UserDataService from '../../../services/user.service';

function UserMoods() {

  let { id } = useParams();
  const [userMoods, setUserMoods] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const retrieveUserMoods = () => {
    const data = {
      userId: id
    }
    MoodDataService.findByUserId(data)
      .then(response =>
        setUserMoods(response.data.map((e) => ({
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

  useEffect(() => {
    retrieveUserMoods();
  }, [])


  return (
    <div>
        <Grid
          mt={1}
          container
          rowSpacing={2}
          justifyContent={'center'}
          alignItems={'center'}
          style={{ borderRadius: '10px' }}
        >
          {
          userMoods.length > 0 ?
          userMoods.map(({ id, message, userId, username, profilImg, createdAt }) => (
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
          :
          <Grid item xs={12} key={id} >
              <Typography>No Mood yet</Typography>
            </Grid>
        }
        </Grid>
    </div>
  )
}

export default UserMoods