import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';

function FriendsDrawer(open) {

    const [state, setState] = React.useState(open);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
      };

  return (
    <div>
          <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
              <Button onClick={toggleDrawer(false)}><CloseIcon /></Button>
          </Drawer>
    </div>
  )
}

export default FriendsDrawer