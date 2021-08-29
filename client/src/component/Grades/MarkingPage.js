/*Author - Sowmya Busanagari*/
import "../../stylesheets/markingPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import SideBar from "./sideBarInstructor";
import Axios from 'axios';
import Header from "../courseRating/header";

function MarkingPage() {
    const [gradeMark, setGradeMark] = useState('');
    const [feedback, setFeedback] = useState('');
    const [courseId, setCourseId] = useState('');
    const [userName, setUserName] = useState('');
    const [gradeId, setGradeId] = useState('');
    const history = useHistory();
    const param = useParams();

    Axios.get("https://project5709.herokuapp.com/grade/" + param.id).then((response) => {
        setCourseId(response.data.grade.courseId)
        console.log(courseId)
        setUserName(response.data.grade.studentName)
        setGradeId(param.id)
    })

    const redirectToGradePage = (courseId) => history.push('/grades/gradeHome/' + courseId);
    const redirectToMarkingPage = (gradeId) => history.push('/grades/markingPage/' + param.id);

    const handleSubmit = () => {
        if (!gradeMark) {
            alert("Please provide marks")
            redirectToMarkingPage(param.id);
        }
        else {
            Axios.put('https://project5709.herokuapp.com/grade/marking/' + param.id, {
                gradeMark: gradeMark,
                feedback: feedback
            })

            redirectToGradePage(courseId)

        }




    }

    const handleCancel = () => {
        alert("Canceled. You can continue next time.");
        redirectToGradePage(courseId)
    }

    return (
        <section className="main">
            <SideBar />
            <Header />
            <section className="side">
                <section className="heading">
                    <h2>{userName}</h2>
                </section>
                <article>
                    <div className="survey">
                        <h3>Post Grade</h3>
                        <Form>

                            <Form.Group controlId="formBasicInput">
                                <Form.Label>Provide feed back</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Write some comments" onChange={(event) => { setFeedback(event.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicInput">
                                <Form.Label>Please provide your Marks</Form.Label>
                                <Form.Control as="input" placeholder="Please provide marks" onChange={(event) => { setGradeMark(event.target.value) }} />
                            </Form.Group>
                            <Button className="cancelButton" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button className="applyButton" onClick={handleSubmit}>
                                submit
                            </Button>
                        </Form>
                    </div>
                </article>
            </section>

        </section>
    )
}

export default MarkingPage;