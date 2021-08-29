/* Author - Akash Madan */

import '../../stylesheets/Residence.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Accordion, Alert, Button, Card, Carousel, Col, Container, Form, Nav, NavDropdown, Navbar, Table } from "react-bootstrap";
import React, { Component } from 'react';

import Header from "../courseRating/header";
import Row from 'react-bootstrap/Row';
import SideBar from '../courseRating/sideBar';
import axios from 'axios';




const digitRegex = new RegExp("^[0-9]+$");
const numberRegex = new RegExp("^[0-9]{10}$");
const nameRegex = new RegExp("^[a-zA-Z]+$");
const emailRegex = new RegExp("^[a-zA-Z0-9][-\\w\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
const roomRegex = new RegExp("^(50|[1-4]?[0-9])$");
// const [application, setApplication] = useState([])

const intialState = {
    studentID: '',
    studentName: '',
    studentNumber: '',
    studentEmail: '',
    studentLocation: 'Downtown Halifax',
    studentRoom: 'Single Room',
    studentMeal: 'Vegetarian',
    studentGender: 'Male',
    studentTerm: 'Summer',
    alertMessage: '',
    alertWithdrawMessage: '',
    application: [],
    withdrawApplication: [],

    withdrawStudentID: '',
    withdrawStudentResidenceID: '',
    withdrawStudentEmail: '',
    withdrawStudentName: '',
    withdrawStudentNumber: '',
    withdrawRoomNumber: '',
    withdrawReason: 'NA',

    studentNameError: '',
    studentNumberError: '',
    studentEmailError: '',

    withdrawStudentIDError: '',
    withdrawResidenceIDError: '',
    withdrawStudentNameError: '',
    withdrawStudentNumberError: '',
    withdrawRoomNumberError: '',

    isValidID: "false",
    isValidName: "false",
    isValidNumber: "false",
    isValidEmail: "false",

    isValidWithdrawID: "false",
    isValidWithdrawResidenceID: "false",
    isValidWithdrawEmail: "false",
    isValidWithdrawName: "false",
    isValidWithdrawNumber: "false",
    isValidWithdrawRoomNumber: "false",
}


export default class Residence extends Component {
    constructor(props) {
        super()
        this.state = intialState
    }

    handleStudentIDChange(val) {
        this.setState({ studentID: val })
        if (val.length >= 1 && digitRegex.test(val)) {
            document.getElementById("studentID").style.border = "1px solid green"
            this.setState({ studentIDError: "" })
            this.setState({ isValidID: "true" })
        }
        else {
            document.getElementById("studentID").style.border = "1px solid red"
            this.setState({ studentIDError: "Please enter valid Student ID" })
            this.setState({ isValidID: "false" })
        }
    }

    handleWithdrawStudentIDChange(val) {
        this.setState({ withdrawStudentID: val })
        if (val.length >= 1 && digitRegex.test(val)) {
            document.getElementById("withdrawStudentID").style.border = "1px solid green"
            this.setState({ withdrawStudentIDError: "" })
            this.setState({ isValidWithdrawID: "true" })
        }
        else {
            document.getElementById("withdrawStudentID").style.border = "1px solid red"
            this.setState({ withdrawStudentIDError: "Please enter valid Student ID" })
            this.setState({ isValidWithdrawID: "false" })
        }
    }

    handleWithdrawResidenceIDChange(val) {
        this.setState({ withdrawStudentResidenceID: val })
        if (val.length >= 1 && digitRegex.test(val)) {
            document.getElementById("withdrawStudentResidenceID").style.border = "1px solid green"
            this.setState({ withdrawResidenceIDError: "" })
            this.setState({ isValidWithdrawResidenceID: "true" })
        }
        else {
            document.getElementById("withdrawStudentResidenceID").style.border = "1px solid red"
            this.setState({ withdrawResidenceIDError: "Please enter valid Residence ID" })
            this.setState({ isValidWithdrawResidenceID: "false" })
        }
    }

    handleStudentNameChange(val) {
        this.setState({ studentName: val })
        if (val.length >= 1 && nameRegex.test(val)) {
            document.getElementById("studentName").style.border = "1px solid green"
            this.setState({ studentNameError: "" })
            this.setState({ isValidName: "true" })
        }
        else {
            document.getElementById("studentName").style.border = "1px solid red"
            this.setState({ studentNameError: "Please enter valid Student Name" })
            this.setState({ isValidName: "false" })
        }
    }

    handleStudentNumberChange(val) {
        this.setState({ studentNumber: val })
        if (val.length >= 1 && numberRegex.test(val)) {
            document.getElementById("studentNumber").style.border = "1px solid green"
            this.setState({ studentNumberError: "" })
            this.setState({ isValidNumber: "true" })
        }
        else {
            document.getElementById("studentNumber").style.border = "1px solid red"
            this.setState({ studentNumberError: "Please enter valid number" })
            this.setState({ isValidNumber: "false" })
        }
    }

    handleWithdrawStudentNameChange(val) {
        this.setState({ withdrawStudentName: val })
        if (val.length >= 1 && nameRegex.test(val)) {
            document.getElementById("withdrawStudentName").style.border = "1px solid green"
            this.setState({ withdrawStudentNameError: "" })
            this.setState({ isValidWithdrawName: "true" })
        }
        else {
            document.getElementById("withdrawStudentName").style.border = "1px solid red"
            this.setState({ withdrawStudentNameError: "Please enter valid Student Name" })
            this.setState({ isValidWithdrawName: "false" })
        }
    }

    handleWithdrawStudentNumberChange(val) {
        this.setState({ withdrawStudentNumber: val })
        if (val.length >= 1 && numberRegex.test(val)) {
            document.getElementById("withdrawStudentNumber").style.border = "1px solid green"
            this.setState({ withdrawStudentNumberError: "" })
            this.setState({ isValidWithdrawNumber: "true" })
        }
        else {
            document.getElementById("withdrawStudentNumber").style.border = "1px solid red"
            this.setState({ withdrawStudentNumberError: "Please enter valid number" })
            this.setState({ isValidWithdrawNumber: "false" })
        }
    }

    handleWithdrawRoomNumberChange(val) {
        this.setState({ withdrawRoomNumber: val })
        if (val.length >= 1 && roomRegex.test(val)) {
            document.getElementById("withdrawRoomNumber").style.border = "1px solid green"
            this.setState({ withdrawRoomNumberError: "" })
            this.setState({ isValidWithdrawRoomNumber: "true" })
        }
        else {
            document.getElementById("withdrawRoomNumber").style.border = "1px solid red"
            this.setState({ withdrawRoomNumberError: "Please enter valid room number" })
            this.setState({ isValidWithdrawRoomNumber: "false" })
        }
    }

    handleWithdrawReason(val) {
        this.setState({ withdrawReason: val })
    }

    handleStudentEmailChange(val) {
        this.setState({ studentEmail: val })
        if (val.length >= 1 && emailRegex.test(val)) {
            document.getElementById("studentEmail").style.border = "1px solid green"
            this.setState({ studentEmailError: "" })
            this.setState({ isValidEmail: "true" })
        }
        else {
            document.getElementById("studentEmail").style.border = "1px solid red"
            this.setState({ studentEmailError: "Please enter valid email ID" })
            this.setState({ isValidEmail: "false" })
        }
    }

    handleWithdrawStudentEmailChange(val) {
        this.setState({ withdrawStudentEmail: val })
        if (val.length >= 1 && emailRegex.test(val)) {
            document.getElementById("withdrawStudentEmail").style.border = "1px solid green"
            this.setState({ withdrawStudentEmailError: "" })
            this.setState({ isValidWithdrawEmail: "true" })
        }
        else {
            document.getElementById("withdrawStudentEmail").style.border = "1px solid red"
            this.setState({ withdrawStudentEmailError: "Please enter valid email ID" })
            this.setState({ isValidWithdrawEmail: "false" })
        }
    }

    handleLocationChange(val) {
        this.setState({ studentLocation: val })
    }

    handleRoomChange(val) {
        this.setState({ studentRoom: val })
    }
    handleMealChange(val) {
        this.setState({ studentMeal: val })
    }
    handleGenderChange(val) {
        this.setState({ studentGender: val })
    }
    handleTermChange(val) {
        this.setState({ studentTerm: val })
    }

    checkallFields() {
        console.log("Entered into checkallfields function")
        if (this.state.isValidID == "true" && this.state.isValidName == "true" && this.state.isValidNumber == "true" && this.state.isValidEmail == "true") {
            this.setState({ alertMessage: "Please required fields." })
            return true;
        }
        else {
            return false;
        }
    }

    submit(e) {
        e.preventDefault();
        if (this.state.isValidID == "false" && this.state.isValidName == "false" && this.state.isValidNumber == "false" && this.state.isValidEmail == "false") {
            this.setState({ alertMessage: "Please enter required fields." })
            document.getElementById("alertNotSubmit").style.display = "block"
            document.getElementById("alertSubmit").style.display = "none"

            document.getElementById("studentID").style.border = "1px solid red"
            document.getElementById("studentName").style.border = "1px solid red"
            document.getElementById("studentNumber").style.border = "1px solid red"
            document.getElementById("studentEmail").style.border = "1px solid red"
        }
        else {
            if (this.state.isValidID == "true") {
                document.getElementById("studentID").style.border = "1px solid green"
                if (this.state.isValidName == "true") {
                    document.getElementById("studentName").style.border = "1px solid green"
                    if (this.state.isValidNumber == "true") {
                        document.getElementById("studentNumber").style.border = "1px solid green"
                        if (this.state.isValidEmail == "true") {
                            document.getElementById("studentEmail").style.border = "1px solid green"
                            const student_ID = this.state.studentID
                            axios.get('https://project5709.herokuapp.com/user/' + student_ID).then((response) => {
                                if (response.data.success == true) {
                                    document.getElementById("alertNotSubmit").style.display = "block"
                                    document.getElementById("alertSubmit").style.display = "none"
                                    this.setState({ alertMessage: response.data.message })
                                }
                                else {
                                    axios.post('https://project5709.herokuapp.com/insert', {
                                        "studentID": this.state.studentID,
                                        "name": this.state.studentName,
                                        "number": this.state.studentNumber,
                                        "gender": this.state.studentGender,
                                        "emailID": this.state.studentEmail,
                                        "location": this.state.studentLocation,
                                        "bedroomType": this.state.studentRoom,
                                        "meal": this.state.studentMeal,
                                        "term": this.state.studentTerm
                                    }).then((response) => {
                                        this.setState({ application: response.data.message })
                                        if (response.data.success == true) {
                                            document.getElementById("alertSubmit").style.display = "block"
                                            document.getElementById("alertNotSubmit").style.display = "none"
                                            this.setState({ alertMessage: this.state.application })
                                            document.getElementById('studentID').value = "";
                                            document.getElementById('studentName').value = "";
                                            document.getElementById('studentNumber').value = "";
                                            document.getElementById('studentEmail').value = "";
                                            this.setState({ studentID: '' })
                                            this.setState({ studentName: '' })
                                            this.setState({ studentNumber: '' })
                                            this.setState({ studentEmail: '' })
                                            this.setState({ isValidID: 'false' })
                                            this.setState({ isValidName: 'false' })
                                            this.setState({ isValidNumber: 'false' })
                                            this.setState({ isValidEmail: 'false' })
                                        }
                                        else {
                                            document.getElementById("alertNotSubmit").style.display = "block"
                                            document.getElementById("alertSubmit").style.display = "none"
                                            this.setState({ alertMessage: this.state.application })
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            document.getElementById("studentEmail").style.border = "1px solid red"
                            this.setState({ alertMessage: "Please enter required fields." })
                            document.getElementById("alertNotSubmit").style.display = "block"
                            document.getElementById("alertSubmit").style.display = "none"
                        }
                    }
                    else {
                        document.getElementById("studentNumber").style.border = "1px solid red"
                        console.log(this.state.isValidWithdrawNumber)
                        this.setState({ alertMessage: "Please enter required fields." })
                        document.getElementById("alertNotSubmit").style.display = "block"
                        document.getElementById("alertSubmit").style.display = "none"
                    }
                }
                else {
                    document.getElementById("studentName").style.border = "1px solid red"
                    this.setState({ alertMessage: "Please enter required fields." })
                    document.getElementById("alertNotSubmit").style.display = "block"
                    document.getElementById("alertSubmit").style.display = "none"
                }
            }
            else {
                document.getElementById("studentID").style.border = "1px solid red"
                this.setState({ alertMessage: "Please enter required fields." })
                document.getElementById("alertNotSubmit").style.display = "block"
                document.getElementById("alertSubmit").style.display = "none"
            }
        }
    }


    withdrawSubmit(e) {
        e.preventDefault();

        if (this.state.isValidWithdrawID == "false" && this.state.isValidWithdrawResidenceID == "false" && this.state.isValidWithdrawEmail == "false" && this.state.isValidWithdrawName == "false" && this.state.isValidWithdrawNumber == "false" && this.state.isValidWithdrawRoomNumber == "false") {
            this.setState({ alertWithdrawMessage: "Please enter required fields." })
            document.getElementById("alertNotWithdrawSubmit").style.display = "block"
            document.getElementById("alertWithdrawSubmit").style.display = "none"

            document.getElementById("withdrawStudentID").style.border = "1px solid red"
            document.getElementById("withdrawStudentResidenceID").style.border = "1px solid red"
            document.getElementById("withdrawStudentEmail").style.border = "1px solid red"
            document.getElementById("withdrawStudentName").style.border = "1px solid red"
            document.getElementById("withdrawStudentNumber").style.border = "1px solid red"
            document.getElementById("withdrawRoomNumber").style.border = "1px solid red"
        }

        else {
            if (this.state.isValidWithdrawID == "true") {
                if (this.state.isValidWithdrawResidenceID == "true") {
                    if (this.state.isValidWithdrawEmail == "true") {
                        if (this.state.isValidWithdrawName == "true") {
                            if (this.state.isValidWithdrawNumber == "true") {
                                if (this.state.isValidWithdrawRoomNumber == "true") {
                                    axios.get('https://project5709.herokuapp.com/withdraw/user/' + this.state.withdrawStudentID).then((response) => {
                                        if (response.data.success == true) {
                                            document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                                            document.getElementById("alertWithdrawSubmit").style.display = "none"
                                            this.setState({ alertWithdrawMessage: response.data.message })
                                        }
                                        else {
                                            axios.post('https://project5709.herokuapp.com/user/withdraw', {
                                                "withdrawStudentID": this.state.withdrawStudentID,
                                                "withdrawStudentResidenceID": this.state.withdrawStudentResidenceID,
                                                "withdrawStudentEmail": this.state.withdrawStudentEmail,
                                                "withdrawStudentName": this.state.withdrawStudentName,
                                                "withdrawStudentNumber": this.state.withdrawStudentNumber,
                                                "withdrawRoomNumber": this.state.withdrawRoomNumber,
                                                "withdrawReason": this.state.withdrawReason
                                            }).then((response) => {
                                                this.setState({ withdrawApplication: response.data.message })
                                                if (response.data.success == true) {
                                                    document.getElementById("alertWithdrawSubmit").style.display = "block"
                                                    document.getElementById("alertNotWithdrawSubmit").style.display = "none"
                                                    this.setState({ alertWithdrawMessage: this.state.withdrawApplication })
                                                    document.getElementById('withdrawStudentID').value = "";
                                                    document.getElementById('withdrawStudentResidenceID').value = "";
                                                    document.getElementById('withdrawStudentEmail').value = "";
                                                    document.getElementById('withdrawStudentName').value = "";
                                                    document.getElementById('withdrawStudentNumber').value = "";
                                                    document.getElementById('withdrawRoomNumber').value = "";
                                                    document.getElementById('withdrawReason').value = "";
                                                    this.setState({ withdrawStudentID: '' })
                                                    this.setState({ withdrawStudentResidenceID: '' })
                                                    this.setState({ withdrawStudentName: '' })
                                                    this.setState({ withdrawStudentNumber: '' })
                                                    this.setState({ withdrawRoomNumber: '' })
                                                    this.setState({ withdrawReason: 'NA' })
                                                    this.setState({ isValidWithdrawID: 'false' })
                                                    this.setState({ isValidWithdrawResidenceID: 'false' })
                                                    this.setState({ isValidWithdrawEmail: 'false' })
                                                    this.setState({ isValidWithdrawName: 'false' })
                                                    this.setState({ isValidWithdrawNumber: 'false' })
                                                    this.setState({ isValidWithdrawRoomNumber: 'false' })
                                                }
                                                else {
                                                    document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                                                    document.getElementById("alertWithdrawSubmit").style.display = "none"
                                                    this.setState({ alertWithdrawMessage: this.state.withdrawApplication })
                                                }
                                            });
                                        }
                                    })
                                }
                                else {
                                    this.setState({ alertWithdrawMessage: "Please enter required fields." })
                                    document.getElementById("withdrawRoomNumber").style.border = "1px solid red"
                                    document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                                    document.getElementById("alertWithdrawSubmit").style.display = "none"
                                }
                            }
                            else {
                                this.setState({ alertWithdrawMessage: "Please enter required fields." })
                                document.getElementById("withdrawStudentNumber").style.border = "1px solid red"
                                document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                                document.getElementById("alertWithdrawSubmit").style.display = "none"
                            }
                        }
                        else {
                            this.setState({ alertWithdrawMessage: "Please enter required fields." })
                            document.getElementById("withdrawStudentName").style.border = "1px solid red"
                            document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                            document.getElementById("alertWithdrawSubmit").style.display = "none"
                        }
                    }
                    else {
                        this.setState({ alertWithdrawMessage: "Please enter required fields." })
                        document.getElementById("withdrawStudentEmail").style.border = "1px solid red"
                        document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                        document.getElementById("alertWithdrawSubmit").style.display = "none"
                    }
                }
                else {
                    this.setState({ alertWithdrawMessage: "Please enter required fields." })
                    document.getElementById("withdrawStudentResidenceID").style.border = "1px solid red"
                    document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                    document.getElementById("alertWithdrawSubmit").style.display = "none"
                }
            }
            else {
                this.setState({ alertWithdrawMessage: "Please enter required fields." })
                document.getElementById("withdrawStudentID").style.border = "1px solid red"
                document.getElementById("alertNotWithdrawSubmit").style.display = "block"
                document.getElementById("alertWithdrawSubmit").style.display = "none"
            }
        }
    }

    render() {
        return (

            <section>

                <Header />
                <SideBar />
                <br />
                <div class="residence-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <div class="row justify-content-md-center">
                                    <div class="col-lg-6" style={{ textAlign: 'center' }}>
                                        <h2>Apply for residence</h2>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-6">
                                        <Form.Label>Student ID*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="studentID" name="studentID" placeholder="Enter Student ID" style={{ border: "1px solid green" }} onChange={(e) => this.handleStudentIDChange(e.target.value)} />
                                        <div><p>{this.state.studentIDError}</p></div>
                                    </div>
                                    <div class="col-6">
                                        <Form.Label>Name*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="studentName" placeholder="Enter Name" style={{ border: "1px solid green" }} onChange={(e) => this.handleStudentNameChange(e.target.value)} />
                                        <div><p>{this.state.studentNameError}</p></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <Form.Label>Phone Number*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="studentNumber" maxLength="10" placeholder="Enter Number" style={{ border: "1px solid green" }} onChange={(e) => this.handleStudentNumberChange(e.target.value)} />
                                        <div><p>{this.state.studentNumberError}</p></div>
                                    </div>
                                    <div class="col-6">
                                        <Form.Label>Gender*</Form.Label>
                                        <Form.Control as="select" defaultValue="Male" style={{ border: "1px solid green", outline: "none" }} onChange={(e) => this.handleGenderChange(e.target.value)}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </Form.Control>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <Form.Label>Student Email ID*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="studentEmail" placeholder="Enter email ID" style={{ border: "1px solid green" }} onChange={(e) => this.handleStudentEmailChange(e.target.value)} />
                                        <div><p>{this.state.studentEmailError}</p></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <Form.Label>Residence location</Form.Label>
                                        <Form.Control as="select" defaultValue="Downtown Halifax" style={{ border: "1px solid green", outline: "none" }} onChange={(e) => this.handleLocationChange(e.target.value)}>
                                            <option value="Downtown Halifax">Downtown Halifax</option>
                                            <option value="Bradford Halifax">Bradford Halifax</option>
                                        </Form.Control>
                                    </div>
                                    <div class="col-6">
                                        <Form.Label>Bedroom Type</Form.Label>
                                        <Form.Control as="select" defaultValue="Single Room" style={{ border: "1px solid green", outline: "none" }} onChange={(e) => this.handleRoomChange(e.target.value)}>
                                            <option value="Single Room">Single Room</option>
                                            <option value="Shared Room">Shared Room- with max 2 person</option>
                                        </Form.Control>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-6">
                                        <Form.Label>Meal plan</Form.Label>
                                        <Form.Control as="select" defaultValue="Vegetarian" style={{ border: "1px solid green", outline: "none" }} onChange={(e) => this.handleMealChange(e.target.value)}>
                                            <option value="Vegetarian">Vegetarian</option>
                                            <option value="Non-vegetarian">Non-vegetarian</option>
                                        </Form.Control>
                                    </div>
                                    <div class="col-6">
                                        <Form.Label>Select Term</Form.Label>
                                        <Form.Control as="select" defaultValue="Summer" style={{ border: "1px solid green", outline: "none" }} onChange={(e) => this.handleTermChange(e.target.value)}>
                                            <option value="Summer">Summer</option>
                                            <option value="Fall">Fall</option>
                                            <option value="Winter">Winter</option>
                                        </Form.Control>
                                    </div>
                                </div>
                                <br /><br />
                                <Button style={{ backgroundColor: "#ff632f", border: "none", marginLeft: "40%" }} type="submit" onClick={(e) => this.submit(e)}>Submit</Button>
                                <br /><br />
                                <Alert id="alertSubmit" style={{ display: 'none' }} variant='success'>{this.state.alertMessage}</Alert>
                                <Alert id="alertNotSubmit" style={{ display: 'none' }} variant='danger'>{this.state.alertMessage}</Alert>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="bg-color" id="cost">
                        <br />
                        <div className="container">
                            <div class="row justify-content-md-center">
                                <div class="col-lg-6" style={{ textAlign: 'center' }}>
                                    <h2>Cost & fee</h2>
                                </div>
                            </div>
                            <br />
                            <div class="row justify-content-md-center">
                                <div class="col-md-8" >
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr style={{ color: 'white' }}>
                                                <th>Category</th>
                                                <th>Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ color: 'white' }}>Single Room</td>
                                                <td style={{ color: 'white' }}>$1000</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: 'white' }}>Shared Room</td>
                                                <td style={{ color: 'white' }}>$500</td>
                                            </tr>
                                            <tr style={{ color: 'white' }}>
                                                <td style={{ color: 'white' }}>Single Room with meal</td>
                                                <td style={{ color: 'white' }}>$1500</td>
                                            </tr>
                                            <tr style={{ color: 'white' }}>
                                                <td style={{ color: 'white' }}>Shared Room with meal</td>
                                                <td style={{ color: 'white' }}>$1000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>

                    <br />

                    <div class="container-fluid">
                        <div class="row">
                            <br /><br />
                            <div class="col-6" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <div class="row justify-content-md-center">
                                    <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                        <h2>Withdrawing from residence</h2>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-6">
                                        <Form.Label>Student ID*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawStudentID" name="withdrawStudentID" placeholder="Enter Student ID" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawStudentIDChange(e.target.value)} />
                                        <div><p>{this.state.withdrawStudentIDError}</p></div>
                                    </div>
                                    <div class="col-6">
                                        <Form.Label>Residence ID*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawStudentResidenceID" name="withdrawStudentResidenceID" placeholder="Enter Residence ID" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawResidenceIDChange(e.target.value)} />
                                        <div><p>{this.state.withdrawResidenceIDError}</p></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <Form.Label>Student Email ID*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawStudentEmail" placeholder="Enter email ID" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawStudentEmailChange(e.target.value)} />
                                        <div><p>{this.state.withdrawStudentEmailError}</p></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <Form.Label>Name*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawStudentName" placeholder="Enter Name" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawStudentNameChange(e.target.value)} />
                                        <div><p>{this.state.withdrawStudentNameError}</p></div>
                                    </div>
                                    <div class="col-6">
                                        <Form.Label>Phone Number*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawStudentNumber" maxLength="10" placeholder="Enter Number" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawStudentNumberChange(e.target.value)} />
                                        <div><p>{this.state.withdrawStudentNumberError}</p></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <Form.Label>Room Number*</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawRoomNumber" maxLength="2" placeholder="Enter Room Number" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawRoomNumberChange(e.target.value)} />
                                        <div><p>{this.state.withdrawRoomNumberError}</p></div>
                                    </div>
                                    <div class="col-12">
                                        <Form.Label>Reason (Optional)</Form.Label>
                                        <br />
                                        <input type="text" className="textbox-design" id="withdrawReason" placeholder="Enter Reason for leaving residence" style={{ border: "1px solid green" }} onChange={(e) => this.handleWithdrawReason(e.target.value)} />
                                    </div>
                                </div>
                                <br /><br />
                                <Button style={{ backgroundColor: "#ff632f", border: "none", marginLeft: "40%" }} type="submit" onClick={(e) => this.withdrawSubmit(e)}>Submit</Button>
                                <br /><br />
                                <Alert id="alertWithdrawSubmit" style={{ display: 'none' }} variant='success'>{this.state.alertWithdrawMessage}</Alert>
                                <Alert id="alertNotWithdrawSubmit" style={{ display: 'none' }} variant='danger'>{this.state.alertWithdrawMessage}</Alert>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div id="faq">
                        <br />
                        <div className="container">
                            <div class="row justify-content-md-center">
                                <div class="col-lg-10" style={{ textAlign: 'center' }}>
                                    <h2>FAQ</h2>
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-md-center">
                                <div className="col-md-6" >
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                    Is student allowed to bring car?
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>Yes</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    To whom should I contact in emergency?
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>To manager of that residence.</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <br /><br />

                    </div>


                    {/* <hr style={{ color: 'black', backgroundColor: 'black' }} />
                    <footer>
                        <div className="container">
                            <div className="row" className="text-center">
                                <h4>University</h4>
                            </div>
                            <div className="row">
                                <div className="col-5 text-left"><br />
                                    <span style={{ fontWeight: '5' }}>University</span><br />
                                    <span style={{ fontWeight: '5' }}>demo@university.com</span><br />
                                    <span style={{ fontWeight: '5' }}>+1(902)123-5678</span>
                                </div>
                                <div className="col-7 text-right"><br />
                                    <span style={{ fontWeight: '5' }}>Apply for residence | Cost & fee |Withdrawing from residence | FAQ</span><br />
                                </div>
                            </div>
                        </div>
                    </footer> */}
                    <br /><br />
                </div>
            </section>
        )
    }
}