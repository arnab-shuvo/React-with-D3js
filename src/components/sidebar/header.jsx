import React, { Component } from 'react';

class SidebarHeader extends Component {
    state = {  }
    render() { 
        const {headerTitle} = this.props;
        return ( 
            <div className="sb-header">
                {headerTitle}
            </div>
         );
    }
}
 
export default SidebarHeader;