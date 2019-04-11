import React, { Component } from 'react';

class SidebarLink extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <li onClick={this.props.action} className={'sidebar__link ' + this.props.color} >
                    {this.props.title} 
                </li>
            </React.Fragment>
         );
    }
}
 
export default SidebarLink;