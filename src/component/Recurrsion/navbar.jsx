import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true // Initially collapse the navbar
        };
    }

    toggleNavbar = () => {
        this.setState(prevState => ({
            isCollapsed: !prevState.isCollapsed
        }));
    }

    render() {
        const { isCollapsed } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand">Recursion Tree</span>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={this.toggleNavbar} // Toggle collapse state on button click
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">Home</Link>
                        </li>
                        {/* Add more nav items as needed */}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
