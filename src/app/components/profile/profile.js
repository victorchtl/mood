import React from 'react'
import { useSelector } from 'react-redux';
import BottomBar from '../shared/bottom-bar/bottom-bar';
import Header from '../shared/header/Header'
import Card from '@mui/material/Card';
import { Container, TextField, Grid, Typography, Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';


function Profile() {

  const { user: currentUser } = useSelector((state) => state.auth);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      <Header username={currentUser && currentUser.username} />
      <Container maxWidth="sm">

        <Card sx={{ marginTop: '20px', borderRadius: '10px' }}>
          <Grid container alignItems={'center'}>
            <Grid item m={2}>
              <Badge badgeContent={'edit'} color="primary">
                <Avatar alt={capitalize(currentUser.username)} src="http://coucoucestnous.jpg" sx={{ width: 96, height: 96 }} />
              </Badge>
            </Grid>
            <Grid item xs>
              <Typography variant={'h5'}>{currentUser.username}</Typography>
              <Typography variant={'subtitle2'} color={'text.secondary'}>Status : online</Typography>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ marginTop: '20px', borderRadius: '10px' }}>
          <Grid container alignItems={'center'}>
            <Grid item xs textAlign={'center'}>
            <FavoriteRoundedIcon />
            <Typography variant={'subtitle2'}>Likes (61)</Typography>
            </Grid>
            <Grid item xs textAlign={'center'}>
              <ArrowForwardIosRoundedIcon />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ marginTop: '20px', borderRadius: '10px' }}>
          <Grid container alignItems={'center'}>
            <Grid item xs ml={1.5}>
            <Typography variant={'body1'}>Followers (61)</Typography>
            </Grid>
            <Grid item m={1.5}>
              <ArrowForwardIosRoundedIcon />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ marginTop: '20px', borderRadius: '10px' }}>
          <Grid container alignItems={'center'}>
            <Grid item xs ml={1.5}>
            <Typography variant={'body1'}>Following (261)</Typography>
            </Grid>
            <Grid item m={1.5}>
              <ArrowForwardIosRoundedIcon />
            </Grid>
          </Grid>
        </Card>

      </Container>
      <BottomBar username={currentUser && currentUser.username} />
    </div>
  )
}

export default Profile