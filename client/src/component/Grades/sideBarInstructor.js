/*Author - Sowmya Busanagari*/
import React from 'react'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import '../../stylesheets/sideBar.css'

function SideBar() {
    return (
        <div className='navBar' >
            <nav className='nav-menu' >
                <ul className='nav-menu-items' >
                    <li className='nav-text' >
                        <Link to='/grades/courseSelection' >
                            <AiIcons.AiFillHome />
                            <span > Home </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/viewFeedback' >
                            <AiIcons.AiFillLike />
                            <span > Feedback </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/grades/courseSelection' >
                            <AiIcons.AiFillStar />
                            <span > Grades </span>
                        </Link >
                    </li>

                </ul >
            </nav>
        </div >
    )
}

export default SideBar