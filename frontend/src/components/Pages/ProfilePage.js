import React, { useState, useEffect } from 'react';
import "./ProfilePage.css";
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [updatedInfo, setUpdatedInfo] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get('http://localhost:5000/api/user')
      .then((response) => {
        const userData = response.data.user;
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({
      ...updatedInfo,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to update user information
    axios.post('http://localhost:5000/api/updateProfile', updatedInfo)
      .then((response) => {
        setMessage(response.data.message);
        // Update the user's information displayed on the page
        setUser({
          ...user,
          ...updatedInfo,
        });
      })
      .catch((error) => {
        setMessage('Error updating user information');
        console.error('Error updating user information', error);
      });
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {message && <p className="message">{message}</p>}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={updatedInfo.name}
          onChange={handleInputChange}
          className="prof-input"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={updatedInfo.email}
          onChange={handleInputChange}
          className="prof-input"
        />
        <button type="submit" className="prof-button">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
