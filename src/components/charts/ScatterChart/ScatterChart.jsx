import React, { Component } from 'react';
import ReactD3Pack from './Pack'
const dataJson = require('./main.json');

class ScatterChart extends Component {
    state = {  }
    render() {
        return (
            <div className={'svgHolder'} id={'svgHolder'}>
               <ReactD3Pack 
                startDelay={1000}
                elementDelay={50}
                json={dataJson}></ReactD3Pack>
            </div>
        );
    }
}

export default ScatterChart;