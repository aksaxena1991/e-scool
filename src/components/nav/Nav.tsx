import React from "react";
import './nav.css';
import NavNotice from "./NavNotice";
import NavMessage from "./NavMessage";

const Nav:React.FC = () => {

    return (
        <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
                <NavNotice />
                <NavMessage />
                <NavMessage />
            </ul>
        </nav>
    );
}

export default Nav;