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
import UserDataService from '../../../services/user.service';
import { Link } from 'react-router-dom';

function Mood({ id, message, username, userId, profilImg, createdAt }) {

  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userInfos, setUserInfos] = useState({});
  const [comDisplay, setComDisplay] = useState(false);

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);


  useEffect(() => {
    retrieveComments();
    retrieveLikes();
  }, []);

  const toggleComDisplay = () => {
    if (comDisplay) {
      setComDisplay(false)
    } else setComDisplay(true)
  }

  const postComment = (e) => {
    e.preventDefault();
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
  }


  const retrieveComments = () => {
    CommentDataService.findByMoodId({ "moodId": id })
      .then(response =>
        setComments(response.data.comment.map((e) => ({
          id: e.id,
          message: e.message,
          createdAt: e.createdAt,
          userId: e.user.userId,
          username: e.user.username,
          profilImg: e.user.profilImg
        })))
      )
      .catch(e => {
        console.log(e);
      });
  }

  const likemood = (e) => {

    console.log(likes)

    const data = {
      userId: currentUser.id,
      moodId: id
    }
    LikeDataService.create(data)
      .then(response => {
        retrieveLikes();
      })
      .catch(e => {
        console.log(e)
      })


  }

  const dislikemood = (e) => {
    console.log(likes[0])

    const data = {
      userId: currentUser.id,
      moodId: id
    }
    LikeDataService.dislike(data)
      .then(response => {
        retrieveLikes();
      })
      .catch(e => {
        console.log(e)
      })
  }

  const retrieveLikes = () => {
    LikeDataService.findByUserAndMoodId({ "moodId": id, "userId": currentUser.id })
      .then(response =>
        setLikes(response.data.like.map((e) => ({
          id: e.id,
          userId: e.userId,
          moodId: e.moodId,
          isLike: e.isLike
        })))
      )
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className='mood'>
      <Card elevation={0} sx={{ borderRadius: '5px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: profilImg }} aria-label="recipe">
              {username.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            likes.length > 0 ?
              likes[0].isLike ?
                <IconButton aria-label="settings" onClick={dislikemood} key={id}>
                  <FavoriteIcon color={'primary'} />
                </IconButton>
                :
                <IconButton aria-label="settings" onClick={likemood} key={id}>
                  <FavoriteBorderOutlinedIcon color={'primary'} />
                </IconButton>
              :
              <IconButton aria-label="settings" onClick={likemood} key={id}>
                <FavoriteBorderOutlinedIcon color={'primary'} />
              </IconButton>
          }
          title={
            currentUser.id === userId
              ?
              <Link to={{ pathname: "/profile" }}>{username.charAt(0).toUpperCase() + username.slice(1)}</Link>
              :
              <Link to={{ pathname: `/user/${userId}`, query: { userId } }}>{username.charAt(0).toUpperCase() + username.slice(1)}</Link>
          }
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
          {comments.map(({ id, message, createdAt, userId, username, profilImg }) => (
            <Grid item xs={12} key={id} >
              <Comment
                id={id}
                message={message}
                createdAt={createdAt}
                userId={userId}
                username={username}
                profilImg={profilImg}
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