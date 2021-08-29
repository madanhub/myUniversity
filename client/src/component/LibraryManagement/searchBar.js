// Author - Dhruvi Shah
import { useState } from "react";
import { useHistory } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function SearchBar() {
    const [firstName, setFirstName] = useState('')
    const history = useHistory()


    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">logout</Nav.Link>
                        {/* <Nav.Link href="#action2">Link</Nav.Link> } */}
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown"> */}
                        {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                        {/* <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown> */}
                        {/* <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link> */}
                    </Nav>
                    <Form className="d-flex" >
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" href="/Details" >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default SearchBar;