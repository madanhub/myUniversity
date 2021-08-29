// Author -Sri Sai Bhargav Nuthakki
import '../../stylesheets/ProfileInfo.css';
import React, { Component } from 'react';
import Axios from 'axios';
import Header from "../courseRating/header";
import SideBar from '../courseRating/sideBar';
import UserDetails from "./UserDetails";
import { useParams } from "react-router-dom";

class ProfileInfo extends React.Component {
  static FirstName = "";
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      FirstName: "",
      LastName: "",
      Password: "",
      Email: "",
      PhoneNumber: "",
      usersCollection: []
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

  moveToUpdateProfilePage = () => {
    this.props.history.push('/UpdateProfilePage');
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

  render() {

    return (

      <section>
        <Header />
        <SideBar />

        <section class="updateProfile">
        </section>
        <form method="post" name="updateProfile" onSubmit={this.moveToUpdateProfilePage} >

          <table class="ProfileInfoTable">
            <caption id="ProfileInfoTableName">Profile Information</caption>
            <tr class="FirstName">
              <th id="feildName">First Name</th>
              <td className="feildAlign1">
                {this.state.FirstName}
              </td>
            </tr>

            <tr class="LastName">
              <th id="feildName">Last Name</th>
              <td className="feildAlign1">
                {this.state.LastName}
              </td>
            </tr>

            <tr class="Email">
              <th id="feildName">E-Mail</th>
              <td className="feildAlign1">
                {this.state.Email}
              </td>
            </tr>

            <tr class="MobileNumber">
              <th id="feildName">Mobile Number</th>
              <td className="feildAlign1">
                {this.state.PhoneNumber}
              </td>
            </tr>

            <input id="profileInfoEdit" type="submit" className="button" value="Edit Information" />


          </table>
        </form>
      </section>
    )

  }

}
export default ProfileInfo;