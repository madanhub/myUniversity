// Author - Zongyu Wu

import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "../../stylesheets/courseHome.css"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import SideBar from "./sideBar";
import Header from "./header";


function CourseHome() {
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

    const redirectToEvaluation = (id) => history.push('/evaluation/' + id);

    return (
        <body>
            <Header />
            <SideBar />
            <div className="courseHome-content">
                <div className="courseHome-survey">
                    <h1>Course Rating</h1>
                    <CardDeck className='course-decks'>
                        {courseList.map((val, key) => {
                            console.log(val.courseImage)
                            return (
                                <Card className="course" onClick={() => {
                                    if (val.rated) {
                                        handleShow(val._id);
                                    } else {
                                        redirectToEvaluation(val._id);
                                    }
                                }}>
                                    <Card.Img variant="top" src={'https://project5709.herokuapp.com/' + val.courseImage} />
                                    <Card.Body>
                                        <Card.Title>{val.name}</Card.Title>
                                        <Card.Text>{val.discription}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{val.term}</small>
                                    </Card.Footer>
                                </Card>
                            )
                        })}
                    </CardDeck>
                </div>
                <div className="reminder">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Notice</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>This course has been rated! Would you like rate it again?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                redirectToEvaluation(courseId);
                            }}>
                                Yes
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </body>
    )
}

export default CourseHome;