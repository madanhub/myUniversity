//Author - Sri Sai Bhargav Nuthakki

import "../../stylesheets/homeHeader.css";

import logo from '../Images/logo.jpg';

function HomeHeader() {

    return (
        <div class="NavBarDiv">
            <div class="LoginNavbar">
                <img class="homeLogo" src={logo} />
                <a href="/contact">Contact</a>
                <a href="/Login">Library</a>
                <a href="/LoginPage">Login</a>
                <a href="/home">Home</a>
            </div>
        </div>
    );
}

export default HomeHeader;