import React, { Component } from 'react';
import './App.scss';
import Header from "./layouts/header/header";
import RouterDefault from "../src/setup/route";
import Sidebar from "./layouts/sidebar/sidebar";
import Footer from "./layouts/footer/footer";
import { Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <section className="body_wrap">
        <Grid fluid>
          <Row>
            <Col sm={12} md={12} xs={12}>
              <Row>               
                <Header /> {/* Importing Header in the body  */}
              </Row>
            </Col>
            <Col sm={9} md={9} xs={12}>
              <Row>                           
                <RouterDefault />{/* Importing routing which will manage all the routing */}                
              </Row>
            </Col>
            <Col sm={3} md={3} xs={12}>
              <Row>
                {/* This is the sidebar which will contain the control panels */}
                <Sidebar /> 
              </Row>
            </Col>
            <Col sm={12} md={12} xs={12}>
              <Row>               
                <Footer />
                {/* Importing Footer */}
              </Row>
            </Col>
          </Row>
        </Grid>
        
      </section>
    );
  }
}

export default App;
