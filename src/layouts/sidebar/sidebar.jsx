import React, { Component } from 'react';
import Sidebarbody from '../../components/sidebar/body';
import './sidebar.scss';


class Sidebar extends Component {
    state = {  }
    render() {         
        return ( 
            <div className="sidebar-wrap">
                <Sidebarbody/>
            </div>
         );
    }
}

export default Sidebar;