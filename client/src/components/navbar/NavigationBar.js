import { NavLink } from 'react-router-dom';
import React from 'react';

//TODO Make the navbar look nice!

export class NavigationBar extends React.Component {
    render() {
        const activeStyle = { color: 'grey' };

        return (
            <div>
                <div className="navbar-inverse">
                            <NavLink className="navLink" exact to="/" activeStyle={activeStyle}>Home</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/about" activeStyle={activeStyle}>About</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/app-store" activeStyle={activeStyle}>App Store</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/app-page" activeStyle={activeStyle}>App Page</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/submit-app" activeStyle={activeStyle}>Submit App</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/online-component" activeStyle={activeStyle}>Example Online Component</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/test-form" activeStyle={activeStyle}>Example Form</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/register-user" activeStyle={activeStyle}>Register</NavLink>
                            {' | '}
                            <NavLink className="navLink" to="/login" activeStyle={activeStyle}>Login</NavLink>
                    </div>
            </div>
        );
    }
}

export default NavigationBar;