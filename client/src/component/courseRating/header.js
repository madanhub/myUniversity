//Author - Zongyu Wu

import "../../stylesheets/header.css";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import axios from 'axios'
import logo from "../../logo.svg";
import UserDetails from '../profileManagement/UserDetails';

function Header() {
    const [firstName, setFirstName] = useState('')
    const param = useParams();
    const history = useHistory()


    useEffect(() => {    
        console.log(UserDetails.getId())
        axios.get("https://project5709.herokuapp.com/userInformation/getUserDetails/" + UserDetails.getId()).then((response) => {
            console.log(response.data.result.FirstName)
            setFirstName(response.data.result.FirstName)
        })
    }, [])

    const reDirectToProfile = () => history.push('/profilehome');
    const logout = () => history.push('/LoginPage');

    return (
        <div className="header">
            <Navbar>
                <Navbar.Brand>
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title={firstName} id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={reDirectToProfile}>Profile</NavDropdown.Item>
                        <NavDropdown.Item>Account</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;