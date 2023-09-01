import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"; // Import your CSS file for styling
import axios from "axios";

const Signup = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials=true;

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: name,
        email: email,
        password: password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      // Handle the error, e.g., display an error message to the user
      window.alert("Error: " + err.response.data.message);
      throw err; // Rethrow the error to propagate it to the caller
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send http request and handle errors
      const data = await sendRequest();
      // Check if the request was successful before redirecting
      if (data) {
        history("/login");
      }
    } catch (error) {
      // Handle errors here, if needed
    }
  };
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className ="btn-su" type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
