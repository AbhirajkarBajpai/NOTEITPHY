// AboutPage.js
import React from 'react';
import './about.css'; // Create a CSS file for styling

function AboutPage() {
    return (
      <div className="about-container">
        <div className="left-content">
          <h2>About Make Notes App</h2>
          <p>
            A simple and powerful note-taking app designed to help you
            organize your thoughts, ideas, and tasks. With Make Notes, you can
            easily create, edit, and manage your notes, whether you're at home,
            at work, or on the go.
          </p>
          <h2>About the Author</h2>
          <p>
            Abhirajkar Bajpai is a passionate developer with a love for creating
            practical and user-friendly applications. With years of experience
            in web development, he is dedicated to delivering high-quality
            software that enhances productivity.
          </p>
        </div>
        <div className="right-content">
          <img
            src="author-image.jpg" // Replace with the actual path to the author's image
            alt="Author"
          />
        </div>
      </div>
    );
  }

export default AboutPage;

