import React from "react";
import './header.css';
import Logo from "../logo/Logo";
import SearchBar from "../search-bar/SearchBar";
import Nav from "../nav/Nav";
const Header:React.FC = () => {

    return <header id="header" className="header fixed-top d-flex align-items-center">
        {/* logo */}
        <Logo />
        {/* search bar */}
        <SearchBar />
        {/* nav */}
        <Nav />
    </header>
}

export default Header;