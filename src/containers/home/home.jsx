import React, { Component } from 'react';
import LineChart from '../../components/charts/LineChart/lineChart';
import './home.scss';

class Home extends Component {
    state = {  }
    render() {         
        return ( 
            <React.Fragment>
                <div className="wrapper">
                    <LineChart />
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;