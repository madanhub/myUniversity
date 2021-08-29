/*Author - Sowmya Busanagari*/
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "../../stylesheets/CourseSelection.css";
import "../../stylesheets/courseHome.css"
import logo from "../../logo.svg";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import SideBar from "./sideBarInstructor";
import Header from '../courseRating/header';
import UserDetails from '../profileManagement/UserDetails';

function CourseSelection() {
    const [show, setShow] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [courseList, setCourseList] = useState([])
    const history = useHistory();

    axios.get("https://project5709.herokuapp.com/userInformation/getUserDetails/" + UserDetails.getId()).then((response) => {
        console.log(response.data.result.FirstName)
        setFirstName(response.data.result.FirstName)
    })


    useEffect(() => {
        axios.get("https://project5709.herokuapp.com/course/all").then((response) => {
            setCourseList(response.data.course)
            console.log(response.data)
        })
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setCourseId(id);
    }

    const redirectToEvaluation = (id) => history.push('/grades/GradeHome/' + id);
    if (UserDetails.getId() != null) {
        console.log(UserDetails.getId())
        return (
            <>
                <section className="main">
                    <SideBar />
                    <Header />

                    <section className="side">
                        <section className="heading">
                            <h2>Grades</h2>
                        </section>

                        <section className="card-deck">

                            <CardDeck>
                                {courseList.map((val, key) => {
                                    if (val.instructor == firstName) {
                                        return (
                                            <Card className="course-Home" onClick={() => {
                                                if (val.rated) {
                                                    handleShow(val._id);
                                                } else {
                                                    redirectToEvaluation(val._id);
                                                }
                                            }}>
                                                <Card.Img variant="top" src={'https://project5709.herokuapp.com/' + val.courseImage} />
                                                <Card.Body>
                                                    <Card.Title>{val.name}</Card.Title>
                                                    <Card.Text>{val.instructor}</Card.Text>

                                                </Card.Body>
                                                <Card.Footer><Button className="add" onClick={() => {
                                                    redirectToEvaluation(val._id);
                                                }}>Post grades</Button></Card.Footer>


                                            </Card>
                                        )
                                    }
                                })}
                            </CardDeck>
                        </section>
                    </section>
                </section>
            </>
        );

    }





}

export default CourseSelection;