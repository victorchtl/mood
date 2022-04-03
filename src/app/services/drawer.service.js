import React, { useState } from 'react';



class DrawerService extends React.Component {
    constructor(props) {
        super(props);
        this.state = 'close';
        
    }
    displayFriendsDrawer(el) {
        this.state = el
    }
}
export default new DrawerService();