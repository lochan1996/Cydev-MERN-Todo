import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Axios from 'axios';
import { Nav, Navbar } from 'react-bootstrap';

const API = 'http://localhost:8000/api/'

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
};

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => console.log("signout success"))
            .catch(err => console.log(err))
    }
};

export const isAuthenticate = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false;
    }
};

export const getAllUsers = () => {
    
    return fetch(`${API}/getAllUsers`, {
        method: "GET"

    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}   


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    }
    else {
        return { color: "#FFFFFF" }
    }
};

const Menu = ({ history }) => (
    <div>
        <Navbar bg="dark" expand="lg">
            <ul className="nav nav-tabs bg-dark">
            <Navbar.Brand><li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                    
                </Navbar.Brand>
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <li className="nav-item">
                        <Link style={currentTab(history, "/create")} className="nav-link" to="/create">Create</Link>
                    </li>
                    {isAuthenticate() && isAuthenticate().user.role === 0 && (
                        <li className="nav-item">
                            <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">U.Dashboard</Link>
                        </li>
                    )}
                    {isAuthenticate() && isAuthenticate().user.role === 1 && (
                        <li className="nav-item">
                            <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                        </li>
                    )}
                    {!isAuthenticate() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Sign Up</Link>
                            </li>

                            <li className="nav-item">
                                <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Sign In</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticate() && (
                        <li className="nav-item">
                            <span className="nav-link text-warning" onClick={() => {
                                signout(() => {
                                    history.push("/")
                                })
                            }}>Signout</span>

                        </li>
                    )}
                </Nav>
                
                </Navbar.Collapse>
            </ul>
        </Navbar>

        <br/>
        
    </div>
)


export default withRouter(Menu)


