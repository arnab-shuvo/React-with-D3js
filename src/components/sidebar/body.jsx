import React, { Component } from 'react';
import CheckGroup from './checkgroup';
import CheckGroupGol from './checkGroupGol';

class Sidebarbody extends Component {
    state = { 
        groupOne: false,
        groupTwo: false
    }

    toggleSelectForschung5ebiet= () =>{
        let groupOne = !this.state.groupOne;
        this.setState({ groupOne });
    }
    
    render() { 
        
        return ( 
            
            <div className="sidebar">

                <CheckGroup />
                <CheckGroupGol  />
                


            </div>
         );
    }
}
 
export default Sidebarbody;