

import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact.js';
import HomeLayout from './components/HomeLayout.js';
import OtherLayout from './components/OtherLayout.js';
import ChatLayout from './components/ChatLayout.js';
import Chat from './components/chat/Chat';
import './styles/Styles.css';
import PrivateRoute from "./PrivateRoute";
import Login from './components/Login';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import AttachmentState from './context/attachment/AttachmentState';


function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path="/" element={<HomeLayout>
              <Home />
            </HomeLayout>} />

            <Route path="/about" element={<OtherLayout>
              <About />
            </OtherLayout>} />
            <Route path="/contact" element={<OtherLayout>
              <Contact />
            </OtherLayout>} />

            <Route path="/chat/*" element={<ChatLayout>
              <AttachmentState>
                <Chat />
              </AttachmentState>

            </ChatLayout>} />
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App; 