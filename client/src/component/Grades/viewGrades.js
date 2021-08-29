/*Author - Sowmya Busanagari*/
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "../../stylesheets/CourseSelection.css";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from '../courseRating/header';
import SideBar from "../courseRating/sideBar";
import UserDetails from "../profileManagement/UserDetails"

function ViewGrade() {
  const [show, setShow] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [userList, setUserList] = useState([]);
  const [firstName, setFirstName] = useState('')
  const history = useHistory();
  const param = useParams();



  axios.get("https://project5709.herokuapp.com/userInformation/getUserDetails/" + UserDetails.getId()).then((response) => {
    console.log(response.data.result.FirstName)
    setFirstName(response.data.result.FirstName)
  })



  useEffect(() => {
    axios.get("https://project5709.herokuapp.com/grade/all/" + param.id).then((response) => {
      setUserList(response.data.grade)
      console.log(response.data.grade)

    })
  },
    [])

  const redirectToMarkingPage = (id) => history.push('/grades/markingPage/' + id);
  return (
    <>
      <body>
        <Header />
        <SideBar />

        <section className="side">
          <section className="heading"><h1>Grades</h1></section>
          <section className="submissionList">
            <table className="gradingTable">
              <tbody>
                <tr className="tableHeader">
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Feedback</th>
                </tr>
                {userList.map((val, key) => {

                  if (val.studentName == firstName) {

                    return (

                      <tr>
                        <td>{val.courseName}</td>
                        <td>{val.gradeMark}</td>
                        <td>{val.feedback}</td>
                      </tr>
                    )

                  }


                })}
              </tbody>



            </table>
          </section>
        </section>
      </body>
    </>
  );
}

export default ViewGrade;