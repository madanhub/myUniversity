// Author -Sri Sai Bhargav Nuthakki
import '../../stylesheets/LoginPage.css'
import React, { Component } from 'react';
import Axios from 'axios';
import HomeHeader from "./homeHeader";
import UserDetails from './UserDetails';

class LoginPage extends React.Component {

   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.SubmitUserLogin = this.SubmitUserLogin.bind(this);
      this.state = {
         fields: {},
         errors: {},

      }
   };

   handleChange = (e) => {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
         fields
      });

   }

   SubmitUserLogin = (e) => {
      e.preventDefault();
      if (this.validateForm()) {
         Axios.post('https://project5709.herokuapp.com/userInformation/login', {
            Email: this.state.fields.Email,
            Password: this.state.fields.Password
         }).then((response) => {
            let result = response.status;
            let Data = response.data;
            let Role = Data.Role;
            let ID = Data.id;

            if (result == 200 && Role == "student" && this.state.fields.EnterCaptcha == 10) {

               UserDetails.setId(ID);
               this.props.history.push('/HomePage/' + ID);
            }
            else if (result == 200 && Role == "faculty" && this.state.fields.EnterCaptcha == 10) {
               UserDetails.setId(ID);
               this.props.history.push('/grades/courseSelection');

            }


         }).catch(function (error) {
            alert("Invalid Credentials or Captcha!!");
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

      if (!fields["Password"]) {
         formIsValid = false;
         errors["Password"] = "Please enter your Password!!";
      }

      if (!fields["EnterCaptcha"]) {
         formIsValid = false;
         errors["EnterCaptcha"] = "Please enter captcha!!";
      }

      this.setState({
         errors: errors
      });
      return formIsValid;
   }

   moveToHomePage = () => {
      alert("id:")
      this.props.history.push('/');

   }

   render() {
      return (
         <section>
            <HomeHeader />

            <section class="overlay">
            </section>

            <form method="post" class="login" name="LoginPage" onSubmit={this.SubmitUserLogin}>
               <h2 id="loginTableName">User Login</h2>
               <div>
                  <table class="loginTable">
                     <tr class="Email">
                        <th id="loginfeildName">Email</th>
                        <td className="loginfeildAlign">
                           <input type="text" id="loginfeildValue" name="Email" value={this.state.fields.Email} onChange={this.handleChange} placeholder="Enter Email" />
                           <section className="errorMsg">{this.state.errors.Email}</section>
                        </td>
                     </tr>

                     <tr class="Password">
                        <th id="loginfeildName">Password</th>
                        <td className="loginfeildAlign">
                           <input type="password" id="loginfeildValue" name="Password" value={this.state.fields.Password} onChange={this.handleChange} placeholder="Enter Password" />
                           <section className="errorMsg">{this.state.errors.Password}</section>
                        </td>
                     </tr>

                     <tr class="Captcha">
                        <th id="loginfeildName">Captcha</th>
                        <td className="loginfeildAlign">
                           <input type="text" id="loginfeildValue" name="captcha" value="2*5" />
                        </td>
                     </tr>

                     <tr class="EnterCaptcha">
                        <th id="loginfeildName">Enter Captcha</th>
                        <td className="loginfeildAlign">
                           <input type="text" id="loginfeildValue" name="EnterCaptcha" value={this.state.fields.EnterCaptcha} onChange={this.handleChange} placeholder="Enter Captcha" />
                           <section className="errorMsg">{this.state.errors.EnterCaptcha}</section>
                        </td>
                     </tr>
                  </table>
               </div>
               <div class="submit">
                  <input id="login" type="submit" className="button" value="Login" />
                  <button id="signup"><a id="anchor" href="/RegistrationPage">Create Account</a></button>
               </div>
               <a id="forget" href="/ForgetPassword">Forget Password?</a>

            </form>
         </section>


      )
   }
}
export default LoginPage;