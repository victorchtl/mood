import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Grid, Typography, Avatar, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoodDataService from '../../services/mood.service'
import Mood from '../shared/mood/Mood';
import FollowingDataService from '../../services/following.service';
import UserDataService from '../../services/user.service';


function Profile() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [followingCount, setFollowingCount] = useState("");
  const [followersCount, setFollowersCount] = useState("");
  const [moodsCount, setMoodsCount] = useState("");
  const [userInfos, setUserInfos] = useState([]);
  const [username, setUsername] = useState('');
  let navigate = useNavigate();

  const retrieveUserInfos = () => {
    UserDataService.get(currentUser.id)
      .then(response => {
        setUserInfos(response.data)
        setUsername(response.data.username)
        console.log(userInfos.username)
      }
      )
      .catch(e => {
        console.log(e);
      });
  }

  const retrieveFollowingNumber = () => {
    FollowingDataService.getFollowingCount({ userId: currentUser.id })
      .then(response =>
        setFollowingCount(response.data)
      )
      .catch(e => {
        console.log(e);
      });
  }

  const retrieveFollowersNumber = () => {
    FollowingDataService.getFollowersCount({ followingId: currentUser.id })
      .then(response =>
        setFollowersCount(response.data)
      )
      .catch(e => {
        console.log(e);
      });
  }

  const retrieveMoodsNumber = () => {
    MoodDataService.countMoods({ userId: currentUser.id })
      .then(response =>
        setMoodsCount(response.data)
      )
      .catch(e => {
        console.log(e);
      });
  }

  const SkeletonUser = () => {
    return (
      <>
        <Card sx={{ marginTop: '20px', borderRadius: '5px' }} elevation={0}>
          <Grid container alignItems={'center'}>
            <Grid item m={2}>
              <Skeleton variant="circular" width={48} height={48} />
            </Grid>
            <Grid item xs style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={40} />
              <Skeleton variant="text" width={10} />
            </Grid>
            <Grid item xs style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={60} />
              <Skeleton variant="text" width={10} />
            </Grid>
            <Grid item xs style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={60} />
              <Skeleton variant="text" width={10} />
            </Grid>
          </Grid>
          <Grid container alignItems={'center'}>
            <Grid item m={2}>
              <Skeleton variant="text" width={70} height={24} />
            </Grid>
          </Grid>
        </Card>
      </>
    );
  };

  useEffect(() => {
    retrieveUserInfos();
    retrieveFollowingNumber();
    retrieveFollowersNumber();
    retrieveMoodsNumber();
  }, [])

  return (
    <div>
      <Container maxWidth="sm">

        {userInfos.username ?

          (<Card sx={{ marginTop: '20px', borderRadius: '5px' }} elevation={0}>
            <Grid container alignItems={'center'}>
              <Grid onClick={() => navigate("/profile/edit")} item m={2} style={{ cursor: 'pointer' }}>
                <Badge badgeContent={"edit"} color="primary">
                  <Avatar alt={username.charAt(0).toUpperCase() + username.slice(1)} src="http://coucoucestnous.jpg" sx={{ width: 48, height: 48, bgcolor: userInfos.profilImg }} />
                </Badge>
              </Grid>
              <Grid onClick={() => navigate("/profile")} item xs style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <EmojiEmotionsIcon color={'primary'} fontSize="small" />
                <Typography sx={{ fontSize: ".7em" }} variant={'subtitle2'} color={'text.secondary'}>MOODS</Typography>
                <Typography sx={{ fontSize: ".7em" }} variant={'subtitle2'} color={'text.secondary'}>{moodsCount.data}</Typography>
              </Grid>
              <Grid onClick={() => navigate("/profile/followers")} item xs style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <AccountCircleIcon color={'primary'} fontSize="small" />
                <Typography sx={{ fontSize: ".7em" }} variant={'subtitle2'} color={'text.secondary'}>FOLLOWERS</Typography>
                <Typography sx={{ fontSize: ".7em" }} variant={'subtitle2'} color={'text.secondary'}>{followersCount.data}</Typography>
              </Grid>
              <Grid onClick={() => navigate("/profile/following")} item xs style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <SupervisedUserCircleIcon color={'primary'} fontSize="small" />
                <Typography sx={{ fontSize: ".7em" }} variant={'subtitle2'} color={'text.secondary'}>FOLLOWING</Typography>
                <Typography sx={{ fontSize: ".7em" }} variant={'subtitle2'} color={'text.secondary'}>{followingCount.data}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems={'center'}>
              <Grid item m={2}>
                <Typography variant={'body1'}>{username.charAt(0).toUpperCase() + username.slice(1)}</Typography>
              </Grid>
            </Grid>
          </Card>)

          :
          (
            <SkeletonUser />
          )
        }

        <Outlet />

      </Container>
    </div>
  )
}

export default Profile