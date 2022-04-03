import React from 'react'
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

function FollowingList() {

  const following = [
    {
      username: 'Franck'
    },
    {
      username: 'Arnold'
    },
    {
      username: 'Guy'
    },
    {
      username: 'Annabelle'
    },
    {
      username: 'Ginette'
    },
    {
      username: 'Francis'
    },
    {
      username: 'Gustave'
    },
    {
      username: 'Hervé'
    },
    {
      username: 'Albert'
    },
    {
      username: 'Marguerite'
    },
    {
      username: 'Cerise'
    },
  ]

  return (
    <Box sx={{ width: '60vw', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List
          subheader={
            <>
            <ListSubheader component="div" id="nested-list-subheader">
              Following
            </ListSubheader>
            <Divider />
            </>
          }>
          {following.map((e) => (
            <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt={e.username} src="/static/images/avatar/3.jpg" />
                </ListItemIcon>
                <ListItemText primary={e.username} />
              </ListItemButton>
            </ListItem>
            <Divider />
            </>
          ))}
        </List>
      </nav>
    </Box>
  )
}

export default FollowingList