import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { Col, Row } from 'react-bootstrap';
import Navigation from './Navigation';
const Home = () => {
  return (
    <div className='main_wrapper'>
      <Row>
        <Col md={3}>
          <Link to="/chat">
            <div class="card-box">
              <img src="/Assets/Images/chat.png" alt="chat" width="150" height="150" />
            </div>
          </Link>
        </Col>
      </Row>


    </div >
  )
}

export default Home