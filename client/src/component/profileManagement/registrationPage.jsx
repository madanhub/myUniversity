// Author -Sri Sai Bhargav Nuthakki
import React, { Component } from 'react';
import '../../stylesheets/registrationPage.css';
import Axios from 'axios';
import HomeHeader from "./homeHeader";

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.SubmitUserRegistrationForm = this.SubmitUserRegistrationForm.bind(this);
    this.state = {
      fields: {},
      errors: {}
    }
  };


  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  SubmitUserRegistrationForm = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      Axios.post('https://project5709.herokuapp.com/userInformation/add', {
        FirstName: this.state.fields.FirstName,
        LastName: this.state.fields.LastName,
        Password: this.state.fields.Password,
        ConfirmPassword: this.state.fields.ConfirmPassword,
        Email: this.state.fields.Email,
        Role: this.state.fields.Role,
        SecurityAnswer: this.state.fields.SecurityAnswer,
        PhoneNumber: this.state.fields.PhoneNumber
      }).then((response) => {
        let result = response.status

        if (result == 200) {
          this.moveToHomePage();
          alert("Account Creation Successfull !!");
        }


      }).catch(function (error) {
        alert("Email already Exists!!");
        window.location.reload();
      })

      let fields = {};
      fields["FirstName"] = "";
      fields["LastName"] = "";
      fields["Password"] = "";
      fields["ConfirmPassword"] = "";
      fields["Email"] = "";
      fields["SecurityAnswer"] = "";
      fields["PhoneNumber"] = "";
      this.setState({ fields: fields });
    }
  }



  validateForm = () => {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["FirstName"]) {
      formIsValid = false;
      errors["FirstName"] = "Please enter your Firstname!!";
    }

    if (typeof fields["FirstName"] !== "undefined") {
      if (!fields["FirstName"].match(/^[a-zA-Z]{1,15}$/)) {
        formIsValid = false;
        errors["FirstName"] = "Please enter alphabet characters only or check the valid length!!";
      }
    }

    if (!fields["LastName"]) {
      formIsValid = false;
      errors["LastName"] = "Please enter your Lastname!!";
    }

    if (typeof fields["Lastname"] !== "undefined") {
      if (!fields["LastName"].match(/^[a-zA-Z]{1,15}$/)) {
        formIsValid = false;
        errors["LastName"] = "Please enter alphabet characters only or check the valid length!!";
      }
    }

    if (!fields["Email"]) {
      formIsValid = false;
      errors["Email"] = "Please enter your Email!!";
    }

    if (typeof fields["Email"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["Email"])) {
        formIsValid = false;
        errors["Email"] = "Please enter valid Email!!";
      }
    }

    if (!fields["Password"]) {
      formIsValid = false;
      errors["Password"] = "Please enter your Password!!";
    }

    if (typeof fields["Password"] !== "undefined") {
      if (!fields["Password"].match(/^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["Password"] = "Please enter secure and strong password!!";
      }
    }

    if (!fields["ConfirmPassword"]) {
      formIsValid = false;
      errors["ConfirmPassword"] = "Please enter your Confirm Password!!";
    }

    if (typeof fields["ConfirmPassword"] !== "undefined") {
      if (!fields["ConfirmPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["ConfirmPassword"] = "Please enter secure and strong password!!";
      }
    }

    if (fields["Password"] !== fields["ConfirmPassword"]) {
      formIsValid = false;
      errors["ConfirmPassword"] = "Passwords did not match!!";
    }

    if (!fields["PhoneNumber"]) {
      formIsValid = false;
      errors["PhoneNumber"] = "Please enter your Phone Number!!";
    }
    if (fields["Role"] !== "student" && fields["Role"] !== "faculty") {
      formIsValid = false;
      errors["Role"] = "Please enter your Role correctly!!";
    }

    if (!fields["Role"]) {
      formIsValid = false;
      errors["Role"] = "Please enter your Role!!";
    }


    if (typeof fields["PhoneNumber"] !== "undefined") {
      if (!fields["PhoneNumber"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
        formIsValid = false;
        errors["PhoneNumber"] = "Please check the phone number format!!";
      }
    }
    if (!fields["SecurityAnswer"]) {
      formIsValid = false;
      errors["SecurityAnswer"] = "Please enter your security answer!!";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  moveToHomePage = () => {
    this.props.history.push('/LoginPage');
  }
  moveToSignupPage = () => {
    this.props.history.push('/RegistrationPage');
  }

  render() {
    return (
      <section >
        <HomeHeader />
        <section class="Page">
        </section>

        <h2 class="title">Registration Form</h2>
        <section class="redirectLogin">
          <p>Already have an account?Click here to <span><a href="/LoginPage"> Login!!</a></span></p>
        </section>
        <form method="post" name="RegistrationForm" onSubmit={this.SubmitUserRegistrationForm}>
          <table class="registrationTable">
            <tr class="FirstName">
              <th id="feildName">First Name</th>
              <td className="feildAlign">
                <input type="text" id="feildValue" name="FirstName" placeholder="Enter First Name" value={this.state.fields.FirstName} onChange={this.handleChange} /> (Max 15 characters only)
                <section className="errorMsg">{this.state.errors.FirstName}</section>
              </td>
            </tr>

            <tr class="LastName">
              <th id="feildName">Last Name</th>
              <td className="feildAlign">
                <input type="text" id="feildValue" name="LastName" placeholder="Enter Last Name" value={this.state.fields.LastName} onChange={this.handleChange} /> (Max 15 characters only)
                <section className="errorMsg">{this.state.errors.LastName}</section>
              </td>
            </tr>

            <tr class="Password">
              <th id="feildName">Password</th>
              <td className="feildAlign">
                <input type="password" id="feildValue" name="Password" placeholder="Enter Password" value={this.state.fields.Password} onChange={this.handleChange} /> (Enter between 8 to 15 characters)
                <section className="errorMsg">{this.state.errors.Password}</section>
              </td>
            </tr>

            <tr class="ConfirmPassword">
              <th id="feildName">Confirm Password</th>
              <td className="feildAlign">
                <input type="password" id="feildValue" name="ConfirmPassword" placeholder="Re-enter Password" value={this.state.fields.ConfirmPassword} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.ConfirmPassword}</section>
              </td>
            </tr>

            <tr class="Email">
              <th id="feildName">E-Mail</th>
              <td className="feildAlign">
                <input type="email" id="feildValue" name="Email" placeholder="Enter E-mail Id" value={this.state.fields.Email} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.Email}</section>
              </td>
            </tr>

            <tr class="SecurityQuestion">
              <th id="feildName">Security Question</th>
              <td className="feildAlign">
                <b>Your favourite vehicle?</b>

              </td>
            </tr>

            <tr class="SecurityAnswer">
              <th id="feildName">Security Answer</th>
              <td className="feildAlign">
                <input type="text" id="feildValue" name="SecurityAnswer" value={this.state.fields.SecurityAnswer} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.SecurityAnswer}</section>
              </td>
            </tr>

            <tr class="Role">
              <th id="feildName">Role</th>
              <td className="feildAlign">
                <input type="text" id="feildValue" name="Role" value={this.state.fields.Role} onChange={this.handleChange} />(Enter your role,"student" or "faculty")
                <section className="errorMsg">{this.state.errors.Role}</section>
              </td>
            </tr>

            <tr class="MobileNumber">
              <th id="feildName">Mobile Number</th>
              <td className="feildAlign">
                <input type="text" id="feildValue" name="PhoneNumber" placeholder="Enter mobile number" value={this.state.fields.PhoneNumber} onChange={this.handleChange} />(Eg: +1 902 456 7891 or 902 456 7891)
                <section className="errorMsg">{this.state.errors.PhoneNumber}</section>
              </td>
            </tr>
            <input type="submit" className="registerButton" value="Register" />
          </table>
        </form>
      </section>
    )
  }
}


export default RegistrationPage;