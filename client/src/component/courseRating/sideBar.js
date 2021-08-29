// Author - Zongyu Wu
import '../../stylesheets/sideBar.css'

import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'

import { Link } from 'react-router-dom'
import React from 'react'

function SideBar() {
    return (
        <div className='navBar' >
            <nav className='nav-menu' >
                <ul className='nav-menu-items' >
                    <li className='nav-text' >
                        <Link to='' >
                            <AiIcons.AiFillHome />
                            <span > Home </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/application' >
                            <AiIcons.AiFillBook />
                            <span > Application </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/appliedCourses' >
                            <IoIcons.IoBook />
                            <span > My Courses </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/courseHome' >
                            <AiIcons.AiFillLike />
                            <span > Evaluation </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/grades/ViewGrades' >
                            <AiIcons.AiFillStar />
                            <span > Grades </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/residence' >
                            <FaIcons.FaHome />
                            <span > Residence </span>
                        </Link >
                    </li>
                    <li className='nav-text' >
                        <Link to='/Profile' >
                            <IoIcons.IoLibrary />
                            <span > Library </span>
                        </Link >
                    </li>

                </ul >
            </nav>
        </div >
    )
}

export default SideBar