import React, { Component } from 'react';
import Checkbox from '../form/checkbox';

class CheckGroupGol extends Component {
    state = {
        groupOne: false,
        subGroupOne: false,
        subGroupTwo: false,
        subGroupThree: false,
        subGroupFour: false
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="all-check">
                    <Checkbox  group={'gol'}  color={'green'} toggle={this.toggleSelectForschung5ebiet} title={'GELDGEBER'} allSelect={true} />
                </div>
                <div className="checkGroup">
                    <Checkbox group={'gol'} color={'gray'} title={'DFG'} />
                    <Checkbox group={'gol'} color={'gray'} title={'unbekant'} />
                </div>
            </React.Fragment>
        );
    }
}

export default CheckGroupGol;