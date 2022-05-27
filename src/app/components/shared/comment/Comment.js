import React from 'react'
import { Avatar, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import dateFormatService from '../../../services/date-format.service';

function Comment({ id, message, createdAt, userId, username, profilImg }) {
  return (
    <div className='comment'>
      <Grid container justifyContent={'left'}
        alignItems={'center'}>
        <Grid item xs={.75} display={'flex'} justifyContent={'center'}
        alignItems={'center'} sx={{display: { xs: 'none', sm: 'flex' }}}>
          <Avatar sx={{ width: 24, height: 24, bgcolor: profilImg, fontSize: ".8em" }} src="/static/images/avatar/2.jpg" >
          {username.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item xs={.5} sx={{ display: { xs: 'block', sm: 'none' } }}>
        </Grid>
        <Grid item xs={11}>
          <Grid container justifyContent={'left'}
        alignItems={'center'}>
            <Grid item ml={1}>
            <Typography variant="body2" color="text.primary">
              {username}
            </Typography>
            </Grid>
            <Grid item>
            <Typography variant="caption" component="h2" color="text.secondary" ml={1}>
              {"· " + dateFormatService.formatDate(createdAt)}
            </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={{background: '#eeee', borderRadius:'10px'}} p={1}>
            <Typography variant="body2" color="text.secondary" >
              {message}
            </Typography>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}

export default Comment