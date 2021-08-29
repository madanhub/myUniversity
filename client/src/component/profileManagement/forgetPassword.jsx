// Author -Sri Sai Bhargav Nuthakki
import React, { Component } from 'react';
import HomeHeader from "./homeHeader";
import '../../stylesheets/forgetPassword.css';
import Axios from 'axios';


class ForgetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.SubmitForgetPassword = this.SubmitForgetPassword.bind(this);
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

  SubmitForgetPassword = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      Axios.post('https://project5709.herokuapp.com/userInformation/forgetPassword', {
        Email: this.state.fields.Email,
        SecurityAnswer: this.state.fields.SecurityAnswer
      }).then((response) => {
        if (response.status === 200) {
          this.moveToResetPasswordPage();
        }
      }).catch(function (error) {
        alert("Invalid Details");
        window.location.reload();
      })
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

    if (typeof fields["Email"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["Email"])) {
        formIsValid = false;
        errors["Email"] = "Please enter valid Email!!";
      }
    }

    if (!fields["SecurityAnswer"]) {
      formIsValid = false;
      errors["SecurityAnswer"] = "Please enter your Security Answer!!";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  moveToResetPasswordPage = () => {
    this.props.history.push('/ResetPasswordPage');
  }

  redirectToForgetPasswordPage = () => {
    this.props.history.push('/ForgetPassword');
  }

  render() {
    return (
      <section>
        <HomeHeader />
        <div class="forgetPassword">
        </div>
        <form method="post" name="forgetPasswordPage" onSubmit={this.SubmitForgetPassword}>
          <h2 id="forgetPasswordtableName"> Forget Password</h2>
          <table class="forgetPasswordTable">

            <tr class="Email">
              <th id="forgetPasswordFeildName">E-Mail</th>
              <td className="forgetPasswordFeildAlign">
                <input type="email" id="forgetPasswordFeildValue" name="Email" placeholder="Enter E-mail Id" value={this.state.fields.Email} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.Email}</section>
              </td>
            </tr>

            <tr class="SecurityQuestion">
              <th id="forgetPasswordFeildName">Security Question</th>
              <td className="forgetPasswordFeildAlign">
                <b>Your favourite vehicle?</b>
                <section className="errorMsg">{this.state.errors.SecurityQuestion}</section>
              </td>
            </tr>

            <tr class="SecurityAnswer">
              <th id="forgetPasswordFeildName">Security Answer</th>
              <td className="forgetPasswordFeildAlign">
                <input type="text" id="forgetPasswordFeildValue" name="SecurityAnswer" value={this.state.fields.SecurityAnswer} onChange={this.handleChange} />
                <section className="errorMsg">{this.state.errors.SecurityAnswer}</section>
              </td>
            </tr>
            <input id="forgetPasswordSubmit" type="submit" className="button" value="Submit" />

          </table>
        </form>
      </section>
    )
  }
}
export default ForgetPassword;