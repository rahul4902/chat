import { Link, useNavigate } from "react-router-dom";
import '../styles/Styles.css';
import { Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { SidebarData } from "./SidebarData.js";
import UserCircle from "../icons/UserCircle";
import { authUser } from "../utils/auth";

function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove accessToken from localStorage
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="top-nav" id="toNav">
      <div className='brand_icon'>
        {/* <img src='/Assets/Images/rv3.gif' alt="" /> */}
      </div>
      <div className="right_icons">
        <div className="link_lists">
          {SidebarData.map((item, index) => {

            return <div className="icon_box" key={'nav2-' + index}>
              <Link to={item.path}>
                {item.icon}
              </Link>
            </div>
          })}



          <Dropdown className="dropdown_icon  nav-profile-btn">
            <Dropdown.Toggle variant="success  p-0" id="dropdown-basic" >
              {/* <i className="fas fa-user-circle p-3"></i> */}
              <div className="nav-profile-dropdown">
                <div className="icon">
                  <UserCircle spacing={"p-3"} color={"#FFF"} height={"3rem"} />
                </div>
                <div className="title">
                  <span>{authUser().name}</span>
                </div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <li key={0}><Dropdown.Item href="#/action-1">Action</Dropdown.Item></li>
              <li key={1}><Dropdown.Item href="#/action-2">Another action</Dropdown.Item></li>
              <li key={3}><Dropdown.Item href="#/action-3">Something else</Dropdown.Item></li>
              <div className="dropdown-divider"></div>
              <li key={4}><Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item></li>
            </Dropdown.Menu>
          </Dropdown>

        </div>

      </div>
    </div>
  );
}

export default Navigation;