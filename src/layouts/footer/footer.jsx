import React, { Component } from 'react';
import './footer.scss';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, NavItem } from 'react-bootstrap';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];
class Footer extends Component {
    state = {
        value: { min: 1995, max: 2017 },
        selectedOption: null,
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    render() {
        return (
            <div className="footer">
                <Grid fluid>
                    <Row>
                        <Col className="footer__section">
                            <InputRange
                                maxValue={2018}
                                minValue={1994}
                                value={this.state.value}
                                onChange={value => this.setState({ value })} />
                        </Col>
                        <Col className="footer__section">
                            <Col sm={6}>
                                <FormGroup controlId="formInlineSelect">
                                    <Row>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            VIEW
                                        </Col>
                                        <Col sm={10}>
                                            <Select
                                                value={this.state.selectedOption}
                                                onChange={this.handleChange}
                                                options={options}
                                                placeholder={'Discipline'}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup controlId="formInlineSelect">
                                    <Row>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            VIEW
                                        </Col>
                                        <Col sm={10}>
                                            {/* <FormControl componentClass="select" placeholder="select">
                                                <option value="select">DISCIPLINE</option>
                                                <option value="other">...</option>
                                            </FormControl> */}
                                            <Select
                                                value={this.state.selectedOption}
                                                onChange={this.handleChange}
                                                options={options}
                                                placeholder={'Discipline'}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Col>
                        <Col className="footer__section short_section">
                            <NavItem eventKey={2} href="#">
                                SPEICHERN
                            </NavItem>
                        </Col>
                        <Col className="footer__section short_section" >
                            <NavItem eventKey={2} href="#">
                                TEILEN
                            </NavItem>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Footer;