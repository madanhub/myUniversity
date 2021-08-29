// Author -Sri Sai Bhargav Nuthakki
import React, { Component } from 'react';
import Axios from 'axios';
import HomeHeader from "./homeHeader";
import '../../stylesheets/resetPasswordPage.css';
import bcrypt from 'bcryptjs';


class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.SubmitPassword = this.SubmitPassword.bind(this);
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

  SubmitPassword = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.state.fields.Password, salt, (err, hash) => {
          if (err) throw err;

          this.state.fields["Password"] = hash;
          console.log("cl" + this.state.fields.Password)

          console.log(this.state.fields.Password)
          Axios.put('https://project5709.herokuapp.com/userInformation/updatePassword', {

            Email: this.state.fields.Email,
            Password: this.state.fields.Password
          }).then((response) => {
            let result = response.status
            if (result == 200) {
              alert("password reset successfull !!")
              this.moveToLoginPage();

            }

          }).catch(function (error) {
            alert("Invalid Details!!");
            window.location.reload();
          })
        }
        )
      }
      )
    }

  }




  validateForm = () => {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["Email"]) {
      formIsValid = false;
      errors["Email"] = "Please enter your Email!!";
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
      errors["ConfirmPassword"] = "Please re-confirm your password!!";
    }

    if (fields["Password"] !== fields["ConfirmPassword"]) {
      formIsValid = false;
      errors["ConfirmPassword"] = "Passwords did not match!!"
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  moveToLoginPage = () => {
    this.props.history.push('/LoginPage');
  }

  render() {
    return (
      <section>
        <HomeHeader />
        <section class="resetPassword">
        </section>
        <form method="post" name="resetPasswordPage" onSubmit={this.SubmitPassword}>
          <h2 id="resetPasswordTableName"> Reset Password</h2>
          <table class="resetPasswordTable">

            <tr class="Email">
              <th id="feildName">Email</th>
              <td className="feildAlign">
                <input type="email" id="feildValue" name="Email" placeholder="Enter Email" value={this.state.fields.Email} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.Email}</section>
              </td>
            </tr>

            <tr class="Password">
              <th id="feildName">Password</th>
              <td className="feildAlign">
                <input type="password" id="feildValue" name="Password" placeholder="Enter password" value={this.state.fields.Password} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.Password}</section>
              </td>
            </tr>

            <tr class="ConfirmPassword">
              <th id="feildName">Confirm Password</th>
              <td className="feildAlign">
                <input type="text" id="feildValue" name="ConfirmPassword" placeholder="Re-Enter password" value={this.state.fields.ConfirmPassword} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.ConfirmPassword}</section>
              </td>
            </tr>

            <input id="submit" type="submit" className="resetPasswordSubmit" value="Submit" />

          </table>
        </form>
      </section>
    )
  }
}
export default ResetPasswordPage;