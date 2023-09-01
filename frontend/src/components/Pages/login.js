import React, { useState } from "react";
import "./login.css"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials=true;


  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      window.alert("Error: " + err.response.data.message);
      throw err; 
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        // Checking if the request was successful before dispatching actions
        if (data) {
          dispatch(authActions.login());
          history("/notes");
        }
      })
      .catch((error) => {
        // Handle errors here, if needed
      });
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn-lg" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
