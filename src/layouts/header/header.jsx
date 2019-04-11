import React, { Component } from 'react';
import { Grid, Row, Navbar, Col } from 'react-bootstrap';
import HeaderNav from './header-nav';


class header extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Grid fluid>
                    <Row>
                        <Navbar fluid>
                            <Navbar.Header>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Row>

                                <Navbar.Collapse>
                                    <Col md={12} sm={12} xs={12} className="head-col">
                                        {/* importing header nav */}
                                        <HeaderNav />
                                    </Col>
                                </Navbar.Collapse>

                            </Row>
                        </Navbar>
                    </Row>
                </Grid>
            </React.Fragment>
        );
    }
}

export default header;