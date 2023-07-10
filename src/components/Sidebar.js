
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from "./SidebarData.js";
const Sidebar = () => {
    const [showCollapse, setShowCollapse] = useState(false);

    const handleCollapse = () => {
        setShowCollapse(!showCollapse);
    }
    console.log(SidebarData);
    return (
        <div className='sidebar'>
            <ul>

                {SidebarData.map((item, index) => {

                    return key={index } className = 'sidenav-item' >
                        <Link to={item.path}>{item.icon}
                            <span>
                                {item.title}
                            </span>
                        </Link>
                    </li>
                })}

        </ul>
        </div >
    );
};

export default Sidebar;