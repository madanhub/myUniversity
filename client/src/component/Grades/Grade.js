/*Author - Sowmya Busanagari*/
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "../../stylesheets/CourseSelection.css";
import Button from "react-bootstrap/Card";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "./sideBarInstructor";
import Header from '../courseRating/header';

function Grade() {
  const [show, setShow] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [userList, setUserList] = useState([])
  const history = useHistory();
  const param = useParams();
  axios.get("https://project5709.herokuapp.com/course/" + param.id).then((response) => {
    setCourseName(response.data.course.name)
    console.log(courseName)
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
      <section className="main">
        <SideBar />
        <Header />
        <section className="side">
          <section className="heading">
            <h2>{courseName}</h2>
          </section>
          <section className="submissionList">
            <table className="gradeTable">
              <tbody>
                <tr className="tableHeader">
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
                {userList.map((val, key) => {
                  if (val.courseId == param.id) {

                    return (

                      <tr>
                        <td>{val.studentName}</td>
                        <td>{val.gradeMark}</td>
                        <td className="gradeButton"><Button className="grade" onClick={() => {
                          redirectToMarkingPage(val._id);
                        }}>Grade</Button></td>
                      </tr>
                    )

                  }


                })}
              </tbody>



            </table>
          </section>
          <Button className="back"><a href="/grades/courseSelection">Back to Courses</a></Button>
        </section>
      </section>
    </>
  );
}

export default Grade;