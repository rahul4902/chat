import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiOutlineHome size={25}/>,
        iconClosed: <RiIcons.RiHome4Line />,
        iconOpened: <RiIcons.RiHome4Line />,
        subNav: [
            {
                title: "Our Aim",
                path: "/about-us/aim",
                icon: <IoIcons.IoIosPaper  size={25}/>,
            },
            {
                title: "Our Vision",
                path: "/about-us/vision",
                icon: <IoIcons.IoIosPaper  size={25}/>,
            },
        ],
    },
    {
        title: "Chat",
        path: "/chat/",
        icon: <AiIcons.AiFillWechat size={25}/>,
        iconClosed: <RiIcons.RiChat1Line />,
        iconOpened: <RiIcons.RiChat1Line />,
        subNav: [
            {
                title: "Our Aim",
                path: "/about-us/aim",
                icon: <IoIcons.IoIosPaper  size={25}/>,
            },
            {
                title: "Our Vision",
                path: "/about-us/vision",
                icon: <IoIcons.IoIosPaper  size={25}/>,
            },
        ],
    },
    
];