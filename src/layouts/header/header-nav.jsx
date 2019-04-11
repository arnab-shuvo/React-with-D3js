import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import {Link } from "react-router-dom";
import './header.scss';
import ikon_logo from '../../assets/images/ikon_logo.png';



class HeaderNav extends Component {
    state = {
        active: 'ZEIT'
    }
    menuClick = (active) =>{
        this.setState({active});
    }
    render() {
        
        return (
            <React.Fragment>
                <Nav className="head">
                    <div className="leftNavGroup">
                        <NavItem className={'logo-lnk'} href={"https://www.museumfuernaturkunde.berlin/"}>
                            <Navbar.Brand>
                                <img src={ikon_logo} alt="logo" />
                            </Navbar.Brand>
                        </NavItem>
                        <li  className={(this.state.active == "WISSEN" ? "active" : '')}>
                            <Link to="/wissen" onClick={() => this.menuClick('WISSEN')}>
                                WISSEN
                                <p>Projekte in Clustern</p>
                            </Link>                           
                        </li>
                        <li className="active"  className={(this.state.active == "ZEIT" ? "active" : '')} onClick={() => this.menuClick('ZEIT')}>
                            <Link to="/">
                                ZEIT
                                <p>Anzahl der Projekte uber Jahre</p>
                            </Link>                           
                        </li>
                        <li className={(this.state.active == "RAUM" ? "active" : '')} >
                            <Link to="#"onClick={() => this.menuClick('RAUM')}>
                                RAUM
                            </Link>                           
                        </li>
                    </div>
                    <div className="RightNavGroup">
                        <NavItem >
                            SUCHE
                        </NavItem>
                        <NavItem >
                            MENU
                        </NavItem>

                    </div>


                </Nav>
            </React.Fragment>
        );
    }
}

export default HeaderNav;