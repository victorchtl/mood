import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { Container, Button, Grid } from '@mui/material';
import UserDataService from '../../../services/user.service';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { BorderColor } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import FollowingDataService from "../../../services/following.service";
import { useSelector } from 'react-redux';

function UserFollower() {

  let { id } = useParams();

  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [followersList, setFollowersList] = useState([]);

  const follow = (targetId) => {
    const data = {
      userId: currentUser.id,
      followingId: targetId
    }
    FollowingDataService.follow(data)
      .then(response => {
        retrieveFollowersUsers();
      })
      .catch(e => console.log(e));
  }

  const unfollow = (targetId) => {
    const data = {
      userId: currentUser.id,
      followingId: targetId
    }
    FollowingDataService.unfollow(data)
      .then(response => {
        retrieveFollowersUsers();
      })
      .catch(e => console.log(e));
  }

  const retrieveFollowersUsers = () => {
    UserDataService.getFollowers({ userId: id, currentUserId: currentUser.id })
      .then(response => {
        setFollowersList(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    retrieveFollowersUsers();
  }, [])

  return (
    <Grid mt={1}>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <List
        disablePadding={true}
          // subheader={
          //   <>
          //     <ListSubheader component="div" id="nested-list-subheader">
          //       Searchbar ???????
          //     </ListSubheader>
          //     <Divider />
          //   </>
          // }
          >
          {followersList.map((e) => (
            <>
              <ListItem
                key={e.id}
                secondaryAction={
                  currentUser.id === e.id
                  ?
                  <></>
                  :
                  e.follower === null
                  ?
                  <Button sx={{ border: "2px solid", BorderColor: "primary", backgroundColor: "primary.main", width: "80px"}} onClick={() => follow(e.id)}>
                    <Typography variant="body2" color={"white"} sx={{ fontSize: ".8em", fontWeight: "800" }}>FOLLOW</Typography>
                  </Button>
                  :
                  <Button sx={{ border: "2px solid", BorderColor: "primary", width: "80px"}} onClick={() => unfollow(e.id)}>
                    <Typography variant="body2" sx={{ fontSize: ".8em", fontWeight: "800" }}>UNFOLLOW</Typography>
                  </Button>
                }
              >
                <ListItemAvatar onClick={
                  currentUser.id === e.id
                  ?
                  (() => navigate("/profile"))
                  :
                  (() => navigate(`/user/${e.id}`))
                }
                sx={{cursor:"pointer"}}>
                  <Avatar>
                    <Avatar alt={e.username.charAt(0).toUpperCase()} src="/static/images/avatar/3.jpg" sx={{ bgcolor: e.profilImg }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={e.username}
                  secondary={'bio'}
                  onClick={
                    currentUser.id === e.id
                    ?
                    (() => navigate("/profile"))
                    :
                    (() => navigate(`/user/${e.id}`))
                  } sx={{cursor:"pointer"}}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
      </Grid>
  )
}

export default UserFollower