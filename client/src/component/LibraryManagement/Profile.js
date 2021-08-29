// Author - Dhruvi Shah
import '../../stylesheets/libraryProfile.css';
import React, { Component } from "react";
import SideBar from '../courseRating/sideBar';
import LibraryUserDetails from './LibraryUserDetails';
import axios from 'axios'
import SearchBar from './searchBar';



class profile extends Component {
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
              <div className="column"><input id="BookInfo" type="submit" className="button-content" value="Book" />
              </div>
              <div className="column">  <input id="PaperInfo" type="submit" className="button-content" value="Paper" /></div>
            </div>
          
          </form>
        </div>
      </div>

    )
  }
}

export default profile;