/*Author - Sowmya Busanagari*/
import "../../stylesheets/application.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import SideBar from "../courseRating/sideBar";
import Header from "../courseRating/header";
import Axios from 'axios';
import UserDetails from "../profileManagement/UserDetails";

function Application() {
    const [studentEmail, setStudentEmail] = useState('');
    const [courseId, setCourseId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [paramEmail, setParamEmail] = useState('');
    const [applied, setApplied] = useState('');
    const history = useHistory();
    const param = useParams();

    const redirectToCourseHome = () => history.push('/application');
    Axios.get("https://project5709.herokuapp.com/courseApplication/existedCourse", {
        params: {
            courseId: param.id,
            studentEmail: paramEmail
        },
    }).then((response) => {
        setApplied(response.data.applied)
        console.log(applied)

    })

    Axios.get("https://project5709.herokuapp.com/userInformation/getUserDetails/" + UserDetails.getId()).then((response) => {
        console.log(response.data.result.FirstName)
        setParamEmail(response.data.result.Email)
    })



    const handleSubmit = () => {

        if (applied == true) {
            alert("Already applied!!")
            redirectToCourseHome();
        }
        else {
            Axios.post('https://project5709.herokuapp.com/courseApplication/apply/' + param.id, {
                studentEmail: paramEmail
            })
            alert("Thank you for the Applying.");
            redirectToCourseHome();
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
            <div className="side">
                <h1>Course Application</h1>
                <div className="survey-application">

                    <Form>

                        <Form.Group className="formBasicInput">
                            <Form.Label>Email address</Form.Label><br></br>
                            <Form.Label>{paramEmail}</Form.Label>
                        </Form.Group>
                        <Button className="cancelButton" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button className="applyButton" onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </Form>
                </div>
            </div>
        </body>
    )
}

export default Application;