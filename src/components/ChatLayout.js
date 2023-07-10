import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer.js';

function HomeLayout(props) {
    const { children } = props;
    return (
        <div className="main_wrapper">
            <Navigation />
            <div className='main_content'>                
                <div className='main_body'>{children}</div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default HomeLayout;