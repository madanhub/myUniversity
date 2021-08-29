// Author -Sri Sai Bhargav Nuthakki
import React, { Component } from 'react';
import '../../stylesheets/Contact.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import HomeHeader from "../profileManagement/homeHeader";




class Contact extends Component {

    state = {}
    render() {
        return (
            <div class="ContactPage">
                <HomeHeader />
                <div class="block">
                    <p class="ContactTitle"><b>Contact Us:</b></p>
                    <p class="ContactSubTitle"> <b>If you have any questions, comments or concerns, feel free to contact us.</b></p>


                    <div class="block1">
                        <p id="contactTitle"> <b> Address:</b></p>
                        <p id="contactBody"> 6299 South Street, MyUniversity, PO BOX 15000
                            Halifax, NS  B3H 4R2</p>
                        <p id="contactTitle"><b>Phone Number:</b></p>
                        <p id="contactBody">(902) 111 1111</p>
                        <p id="contactTitle"><b>Email:</b></p>
                        <p id="contactBody">registrar@myUni.ca</p>
                    </div>



                </div>
            </div>


        );
    }
}

export default Contact;