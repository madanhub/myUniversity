// Author -Sri Sai Bhargav Nuthakki
import React, { Component } from 'react';
import '../../stylesheets/homePage.css';
import { useRef, useState } from "react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import { Swiper, SwiperSlide } from "swiper/react";
import HomeHeader from "../profileManagement/homeHeader";
import SwiperCore, {
    Navigation
} from 'swiper/core';

SwiperCore.use([Navigation]);


class HomePage extends Component {
    state = {}
    render() {
        return (
            <div class="homePage">

                <HomeHeader />

                <div>
                    <Swiper navigation={true} className="mySwiper">
                        <SwiperSlide >
                            <img className="swiper-image" src="https://cdn.dal.ca/covid-19-information-and-updates/our-approach/_jcr_content/contentPar/staticimage.adaptive.full.high.jpg/1621534635138.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="swiper-image" src="https://cdn.dal.ca/dept/summer-accommodations/halifax-accommodations/_jcr_content/contentPar/staticimage.adaptive.full.high.jpg/1479386329520.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className="swiper-image" src="https://pbs.twimg.com/media/DwCUjMWUwAAtC6n.jpg" />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div class="campuses">
                    <div class="campus">
                        <h2>Campus1</h2>
                        <img src="https://www.gitam.edu/assets/images/campus/visakhapatnam-campus-image.jpg" />
                    </div>
                    <div class="campus">
                        <h2>Campus2</h2>
                        <img src="https://www.gitam.edu/assets/images/campus/hyderabad-campus-image.jpg" />
                    </div>
                    <div class="campus">
                        <h2>Campus3</h2>
                        <img src="https://www.gitam.edu/assets/images/campus/bengaluru-campus-image.jpg" />
                    </div>
                </div>

            </div>


        );
    }
}

export default HomePage;