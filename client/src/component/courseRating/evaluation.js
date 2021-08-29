//Author - Zongyu Wu

import "../../stylesheets/evaluation.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import SideBar from "./sideBar";
import Header from "./header";

function Evaluation() {
    const [instructorRate, setInstructorRate] = useState(0);
    const [courseRate, setCourseRate] = useState(0);
    const [comment, setComment] = useState('');
    const history = useHistory();
    const param = useParams();

    const redirectToCourseHome = () => history.push('/courseHome');

    const handleSubmit = () => {
        if (!instructorRate && !courseRate) {
            alert("Please complete the required questions!")
        } else {
            Axios.put('https://project5709.herokuapp.com/course/rate/' + param.id, {
                instructorRate: instructorRate,
                courseRate: courseRate,
                comment: comment
            })
            alert("Thank you for the evaluation.");
            redirectToCourseHome()
        }
    }

    const handleCancel = () => {
        alert("Canceled. You can continue next time.");
        redirectToCourseHome();
    }

    return (
        <body>
            <Header />
            <SideBar />
            {/* this i have to add(evalution-content) in my  folder */}
            <div className="evaluation-content">
                <div className="evaluation-survey">
                    <h1 className='evaluation-title'>Evaluation</h1>
                    <Form className='survey-text'>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>*Please rate the instructor from 0 (lowest)to 10 (highest).</Form.Label>
                            <Form.Control as="select" onChange={(event) => { setInstructorRate(event.target.value) }}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>*Please rate the course from 0 (lowest)to 10 (highest).</Form.Label>
                            <Form.Control as="select" onChange={(event) => { setCourseRate(event.target.value) }}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicTextarea">
                            <Form.Label>Please use simple words to describe the course and the instructor.</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Write some comments" onChange={(event) => { setComment(event.target.value) }} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="evaluation-saveButton" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="evaluation-submitButton" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </body>
    )
}

export default Evaluation;