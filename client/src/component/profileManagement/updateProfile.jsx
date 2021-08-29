// Author -Sri Sai Bhargav Nuthakki
import React, { Component } from 'react';
import '../../stylesheets/updateProfile.css';
import Axios from 'axios';
import UserDetails from "./UserDetails";
import Header from "../courseRating/header";
import SideBar from '../courseRating/sideBar';


class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitUpdatedProfile = this.submitUpdatedProfile.bind(this);
    this.state = {
      fields: {},
      errors: {},
      FirstName: "",
      LastName: "",
      Password: "",
      Email: "",
      PhoneNumber: ""
    }
    this.state.fields["id"] = UserDetails.getId();

  };


  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  componentDidMount() {
    Axios.get("https://project5709.herokuapp.com/userInformation/getUserDetails/" + this.state.fields.id).then((response) => {
      this.setState({ FirstName: response.data.result.FirstName });
      this.setState({ LastName: response.data.result.LastName });
      this.setState({ Password: response.data.result.Password });
      this.setState({ Email: response.data.result.Email });
      this.setState({ PhoneNumber: response.data.result.PhoneNumber });
    }).catch(function (error) {
      console.log(error);
    })
  }



  submitUpdatedProfile = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let userId = UserDetails.getId();
      Axios.put('https://project5709.herokuapp.com/userInformation/updateProfile/' + this.state.fields.id, {
        FirstName: this.state.fields.FirstName,
        LastName: this.state.fields.LastName,
        Email: this.state.fields.Email,
        PhoneNumber: this.state.fields.PhoneNumber

      }).then((response) => {
        let result = response.status
        if (result == 200) {
          this.moveToUpdateProfilePage();

        }
      })
      let fields = {};
      fields["FirstName"] = "";
      fields["LastName"] = "";

      fields["Email"] = "";
      fields["PhoneNumber"] = "";
      this.setState({ fields: fields });
      alert("Form submission successfull!!");

    }
  }

  moveToUpdateProfilePage = () => {
    this.props.history.push('/profilehome');
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



    if (!fields["PhoneNumber"]) {
      formIsValid = false;
      errors["PhoneNumber"] = "Please enter your Phone Number!!";
    }

    if (typeof fields["PhoneNumber"] !== "undefined") {
      if (!fields["PhoneNumber"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
        formIsValid = false;
        errors["PhoneNumber"] = "Please enter alphabet characters only or check the valid length!!";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {

    return (

      <section>
        <Header />
        <SideBar />

        <section class="updateProfile">
        </section>
        <form method="post" name="updateProfile" onSubmit={this.submitUpdatedProfile}>
          <h2 id="updateProfileTableName">Update Profile</h2>
          <table class="updateProfileTable">

            <tr class="FirstName">
              <th id="feildname">First Name</th>
              <td id="feildvalue">
                <input type="text" name="FirstName" placeholder={this.state.FirstName} value={this.state.fields.FirstName} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.FirstName}</section>
              </td>
            </tr>

            <tr class="LastName">
              <th id="feildname">Last Name</th>
              <td id="feildvalue">
                <input type="text" name="LastName" placeholder={this.state.LastName} value={this.state.fields.LastName} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.LastName}</section>
              </td>
            </tr>

            <tr class="Email">
              <th id="feildname">E-Mail</th>
              <td id="feildvalue">
                <input type="email" name="Email" placeholder={this.state.Email} value={this.state.fields.Email} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.Email}</section>
              </td>
            </tr>



            <tr class="MobileNumber">
              <th id="feildname">Mobile Number</th>
              <td id="feildvalue">
                <input type="text" name="PhoneNumber" placeholder={this.state.PhoneNumber} value={this.state.fields.PhoneNumber} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.PhoneNumber}</section>
              </td>
            </tr>

            <input id="updateProfileSubmit" type="submit" className="button" value="Submit" />


          </table>
        </form>
      </section>
    )

  }

}
export default UpdateProfile;