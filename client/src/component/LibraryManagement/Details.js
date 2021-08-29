// Author - Dhruvi
import React, { Component } from "react";
import axios from 'axios';
import SideBar from '../courseRating/sideBar';
import LibraryUserDetails from "./LibraryUserDetails";
import Header from "../courseRating/header";
import SearchBar from './searchBar';


class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.state["id"] = LibraryUserDetails.getId();
  };

  handleChangeInField = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  }

  itemClickHandler = () => {
    this.props.history.push('/Details');
  }

  componentDidMount() {
    axios.get("http://localhost:3000/libraryuser/getDetails", this.state.id).then((response) => {
      this.setState({ Email: response.data.result.Email });
      console.log(response)
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (

      <div className="libraryProfile">
        <SearchBar />
        <SideBar />
        <section class="overlay">
        </section>

        <div className="profileContent">
          <form method="post" name="Librarylogin" onSubmit={this.itemClickHandler} >
            <div className="row">
              <div className="column"><input id="ServerlessInfo" type="button" className="button-detail" value="Serverless" />
              </div>
              <div className="column">  <input id="Serverless" type="button" className="button-detail" value="Serverless Analysis" /></div>
            </div>
            <div className="row">
              <div className="column"><input id="WebInfo" type="button" className="button-detail" value="Web Development" />
              </div>
              <div className="column">  <input id="Web" type="button" className="button-detail" value="React detail understanding" /></div>
            </div>
            <div className="row">
              <div className="column"><input id="Data" type="button" className="button-detail" value="Database System" />
              </div>
              <div className="column">  <input id="datainfo" type="button" className="button-detail" value="Database Analysis conecpts" /></div>
            </div>
            <div className="row">
              <div className="column"><input id="Advanced" type="button" className="button-detail" value="software Development" />
              </div>
              <div className="column">  <input id="asd" type="button" className="button-detail" value="Concepts of software development" /></div>
            </div>
            <div className="row">
              <div className="column"><input id="Cloud" type="button" className="button-detail" value="Cloud computing" />
              </div>
              <div className="column">  <input id="cloudinfo" type="button" className="button-detail" value="cloud computing concepts" /></div>
            </div>
            {/* <table class="ProfileTable">
              <tr class="Email">
                <th id="feildName">E-Mail</th>
                <td className="feildAlign1">
                  {this.state.Email}
                </td>
              </tr> */}
            {/* <input id="profileInfo" type="submit" className="button" value="Information" /> */}


            {/* </table> */}
          </form>
        </div>
      </div>

    )
  }
}

export default Details