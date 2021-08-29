// Author - Dhruvi Shah
import React, { Component } from "react";
import axios from 'axios'
import "../../stylesheets/Librarylogin.css"
import SideBar from "../courseRating/sideBar";
import SearchBar from "./searchBar";


class Login extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.Login = this.Login.bind(this);
    this.state = {
      fields: {},
      errors: {},
    }
  }

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  Login = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      axios.post("http://localhost:3000/libraryuser/login", this.state).then((response) => {
        console.log(response)
      })
    }
    this.props.history.push('/libraryProfile');
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
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
        <SearchBar />
        <SideBar />
        <section class="overlay">
        </section>
        <form className="login-content" onSubmit={this.Login}>
          <h1>Login form</h1>
          <div>
            <label>Email</label>
            <input

              type="email"
              placeholder="Email"
              name="email"
              value={this.state.Email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.Password}
              onChange={this.handleChange}
            />
          </div>

          <div className="submit-content">
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    );
  }


}
export default Login;
