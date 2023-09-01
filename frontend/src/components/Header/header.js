import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
axios.defaults.withCredentials = true;


const Header = () => {
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);


  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogoutClick = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const sednRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
  
      console.log("Refresh Response:", res);
  
      const data = await res.data; // Ensure you are awaiting the data
      dispatch(authActions.login());
      setUser(data.user);
      return data;
    } catch (err) {
      console.log(err);
      // Handle errors appropriately
    }
    };
    useEffect(() => { 
        sednRequest();
    }, [isLoggedIn]);

  const handleProfileClick = () => {
    // Add code to handle the dropdown menu click
  };

  return (
    <header>
      <div class="container">
        <input type="checkbox" name="check" id="check" />

        <div class="logo-container">
          <h3 class="logo">
            Noteit<span>Phy</span>
          </h3>
        </div>

        <div class="nav-btn">
          <div class="nav-links">
            <ul>
              <li className="nav-link" style={{ "--i": ".6s" }}>
                <Link to="/about">Home</Link>
              </li>
              <li class="nav-link" style={{"--i": "1.35s" }}>
                <Link to="/notes">All Notes</Link>
              </li>
            </ul>
          </div>
          {!isLoggedIn && ( <div class="log-sign" style={{"--i": "1.8s"}}>
            
            <Link class="btn transparent" to="/login">Login</Link>
            
            <Link class="btn solid" to="/signup">SignUp</Link>
            
          </div>)}
         
          {isLoggedIn && user && (
            <div class="log-sign" style={{"--i": "1.8s"}}>
            <div className="dropdown-menu">
              <button onClick={handleProfileClick}>{user.name}</button>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                  <a  onClick={handleLogoutClick}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            </div>
          )}
          
        </div>

        <div class="hamburger-menu-container">
          <div class="hamburger-menu">
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

