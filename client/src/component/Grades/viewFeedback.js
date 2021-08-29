/*Author - Sowmya Busanagari*/
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "../../stylesheets/CourseSelection.css";
import "../../stylesheets/courseHome.css"
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import SideBar from "./sideBarInstructor";
import Header from '../courseRating/header';
import UserDetails from '../profileManagement/UserDetails';

function ViewFeedback() {
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

  return (
    <>
      <section className="main">
        <SideBar />
        <Header />

        <section className="side">
          <section className="heading">

          </section>
          <section className="feedback">


            {courseList.map((val, key) => {
              if (val.instructor == firstName) {
                return (
                  <>
                    <h1>Your Rating</h1>
                    <h1>{val.instructorRate}</h1>
                  </>

                )
              }
            })}
          </section>

        </section>
      </section>
    </>
  );







}

export default ViewFeedback;