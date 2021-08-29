/*Author - Sowmya Busanagari*/
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "../../stylesheets/appliedCourses.css"
import SideBar from "../courseRating/sideBar";
import Header from "../courseRating/header";
import Button from "react-bootstrap/Button";
import axios from "axios";


function AppliedCourses() {
    const [show, setShow] = useState(false);
    const [courseApplicationId, setCourseApplicationId] = useState('');
    const [courseList, setCourseList] = useState([])
    const history = useHistory();

    useEffect(() => {
        axios.get("https://project5709.herokuapp.com/courseApplication/appliedCourses").then((response) => {
            setCourseList(response.data.course)
            console.log(response.data)
        })
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setCourseApplicationId(id);
    }

    const redirectToCourses = () => history.push('/application');
    const redirectToAppliedCourses = () => history.push('/appliedCourses');
    const deleteCourse = (id) => {
        axios.delete("https://project5709.herokuapp.com/courseApplication/deleteCourse/" + id).then((response) => {
            alert("course Deleted")
            redirectToCourses();

        })
    }

    return (
        <body>
            <Header />
            <SideBar />
            <section className="content">
                <section className="survey">
                    <h1>Your Courses</h1>
                    <Button variant="primary" onClick={() => {
                        redirectToCourses();
                    }}>
                        Add Courses
                    </Button>
                    <CardDeck>
                        {courseList.map((val, key) => {
                            console.log(val.courseImage)
                            return (
                                <Card className="course-applied" onClick={() => {
                                    if (val.applied) {
                                        deleteCourse(val._id);
                                    } else {
                                        alert("Course is not added")
                                    }
                                }}>
                                    <Card.Body>
                                        <Card.Title>{val.courseName}</Card.Title>
                                        <Card.Text>Instructor: {val.courseInstructor}</Card.Text>
                                        <Card.Text>Rating: {val.courseRate}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button className="cancelButton" onClick={() => {
                                            deleteCourse(courseApplicationId);
                                        }}>Drop</Button>
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

export default AppliedCourses;