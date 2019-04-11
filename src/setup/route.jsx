import React, { Component } from 'react';
import Home from "../containers/home/home";
import wissen from "../containers/wissen/wissen";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class RouterDefault extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="body-content">
                    <Switch>
                        <Route exact path="/wissen" component={wissen} />
                        <Route path="/" component={Home} />
                    </Switch>
            </div>
         );
    }
}
 
export default RouterDefault;