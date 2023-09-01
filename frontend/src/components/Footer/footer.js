import React from 'react';
import "./footer.css";

function Footer() {
    return (
        <footer className="footer-container">
          <div className="footer-content">
            <div className="social-icons">
              <a href="#" className="icon-link">
                <i className="fab fa-github" />
              </a>
              <a href="#" className="icon-link">
                <i className="fab fa-facebook" />
              </a>
              <a href="#" className="icon-link">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="icon-link">
                <i className="fab fa-linkedin" />
              </a>
            </div>
            <div className="author-info">
              <p>Abhirajkar Bajpai</p>
              <p>© {new Date().getFullYear()} NoteitPhy</p>
            </div>
          </div>
        </footer>
      );
  }
  

export default Footer;

