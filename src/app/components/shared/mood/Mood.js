import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Mood.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentDataService from '../../../services/comment.service';
import LikeDataService from '../../../services/like.service';
import DateFormatService from '../../../services/date-format.service';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../comment/Comment';
import { getLikes, likemood } from '../../../actions/like';

function Mood({ id, message, user, userImg, createdAt }) {

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [likes, setLikes] = useState([]);

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { likes: currentLikes } = useSelector((state) => state.like);


  useEffect(() => {
    retrieveComments();
    retrieveLikes();
  }, []);

  const postComment = (e) => {
    e.preventDefault();
    // db.collection("mood").add({
    //   userId: 'Victor',
    //   message: input,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp()
    // })
    const data = {
      userId: currentUser.id,
      username: currentUser.username,
      userImg: currentUser.profilImg,
      moodId: id,
      message: input,
    }
    console.log(data)
    CommentDataService.create(data)
      .then(response => {
        retrieveComments()
      })
      .catch(e => {
        console.log(e)
      })
    setInput('');
    console.log(currentLikes)
  }


  const retrieveComments = () => {
    CommentDataService.findByMoodId({ "moodId": id })
      .then(response =>
        setComments(response.data.comment.map((e) => ({
          id: e.id,
          user: e.userId,
          username: e.username,
          userImg: e.userImg,
          message: e.message,
          createdAt: e.createdAt,
        })))
      )
      .catch(e => {
        console.log(e);
      });
  }

  const likemood = (e) => {
    console.log(currentUser.id, id)

    const data = {
      userId: currentUser.id,
      moodId: id
    }
    LikeDataService.create(data)
      .then(response => {
        
      })
      .catch(e => {
        console.log(e)
      })
  }

  // const retrieveLikes = () => {
  //   LikeDataService.findByUserId({ "userId": currentUser.id })
  //     .then(response =>
  //       setLikes(response.data.like.map((e) => ({
  //         id: e.id,
  //         userId: e.userId,
  //         moodId: e.moodId,
  //       })))
  //     )
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  const retrieveLikes = (e) => {
    // e.preventDefault();
    dispatch(getLikes(currentUser.id))
        .then(() => {
          
        })
        .catch((e) => {
          console.log(e)
        });
       
  };

  return (
    <div className='mood'>
      {/* <Typography>
        {id}
      </Typography>
      <h5>{id}</h5>
      <h5>{user}</h5>
      <p>{message}</p> */}

      <Card elevation={2} sx={{ borderRadius: '10px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: userImg }} aria-label="recipe">
              {user.charAt(0).toUpperCase()}
            </Avatar>
          }
          // action={
          //   currentLikes.like.map(({ id, userId, moodId }) => (
              
          //     <IconButton aria-label="settings" onClick={likemood} key={id}>
          //       <FavoriteIcon color={'primary'}/>
          //     </IconButton>
          //   ))

          // }
          title={user.charAt(0).toUpperCase() + user.slice(1)}
          subheader={DateFormatService.formatDate(createdAt)}
        />
        <CardContent >
          <Typography variant="body2" color="text.primary">
            {message}
          </Typography>

        </CardContent>
        <Grid container spacing={2} justifyContent={'center'}
          alignItems={'center'}>
          <Grid item xs={12} mr={2} ml={2} textAlign="center">
            <Divider />
          </Grid>
          {/* <Grid item textAlign="center">
            {!like && <FavoriteBorderOutlinedIcon sx={{color: '#5555', cursor:'pointer'}} fontSize="medium" onClick={addLike}/>}
          </Grid>
          <Grid item xs={12} mr={2} ml={2} textAlign="center">
            <Divider />
          </Grid> */}
          {comments.map(({ id, message, username, userImg, createdAt }) => (
            <Grid item xs={12} key={id} >
              <Comment
                message={message}
                username={username}
                userImg={userImg}
                createdAt={createdAt}
              />
            </Grid>
          ))}
          <Grid item xs mb={2} ml={2}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{ width: '100%' }} type='text' value={input} onChange={e => setInput(e.target.value)} />
          </Grid>

          <Grid item mb={2} ml={1} mr={2}>
            <Button variant="outlined" type='submit' size="small" onClick={postComment}>Share</Button>

          </Grid>
        </Grid>



      </Card>

    </div>
  )
}

export default Mood