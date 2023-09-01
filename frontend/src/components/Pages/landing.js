import React from 'react';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./landing.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const history = useNavigate();
  // useEffect(() => {
  //   const userInfo=localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history("/notes");
  //   }
  // }, [history,]);
  const userInfo= useSelector((state) => state.isLoggedIn);
  useEffect(() => {
      if (userInfo) {
        history("/notes");
      }
    }, [history,userInfo]);

  return (
    <div className="landing-page">
    <main>
      <section className="cta">
      <h1>Welcome to Make Notes</h1>
      <h4>Your Note-Taking Companion.</h4>
        <h2>Get Started</h2>
        <p>Register or log in to start taking notes</p>
        <div className="buttons">
          <button class="signup-btn"><Link style={{color:"black"}} to="/signup">Register</Link></button>
          <button class="login-btn"><Link style={{color:"black"}} to="/login">Login</Link></button>
        </div>
      </section>
    </main>
  </div>
  )
}

export default LandingPage
