/*Author - Sowmya Busanagari*/
import "../../stylesheets/courseApplication.css"

import { useEffect, useState } from 'react';

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Header from "../courseRating/header";
import SideBar from "../courseRating/sideBar";
import axios from "axios";
import { useHistory } from "react-router-dom";


function CourseApplication() {
    const [show, setShow] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [courseList, setCourseList] = useState([])
    const history = useHistory();

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

    const redirectToApplication = (id) => history.push('/apply/' + id);

    return (
        <body>
            <Header />
            <SideBar />
            <section className="content-Home">
                <section className="survey-Home">
                    <CardDeck>
                        {courseList.map((val, key) => {
                            return (
                                <Card className="course-Home" >
                                    <Card.Img variant="top" src={'https://project5709.herokuapp.com/' + val.courseImage} />
                                    <Card.Body>
                                        <Card.Title>{val.name}</Card.Title>
                                        <Card.Text>Instructor: {val.instructor}</Card.Text>
                                        <Card.Text>Rating: {val.courseRate}</Card.Text>

                                    </Card.Body>
                                    <Card.Footer>

                                        <Button className="apply"><a onClick={() => {
                                            if (val.applied) {
                                                alert("already applied")
                                                handleShow(val._id);
                                            } else {
                                                redirectToApplication(val._id);
                                            }
                                        }}>Apply</a></Button>
                                    </Card.Footer>
                                </Card>
                            )
                        })}
                    </CardDeck>
                </section>
            </section>
        </body>
    )
}

export default CourseApplication;