import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
    const getCurrentYear = () => new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <p>
          © Copyright Expense Tracker {getCurrentYear()} | All Rights Reserved | Made by
          <Link
            className="footer-name"
            to={"https://github.com/asavant151/"}
            target="_blank"
          >
            Savan
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Footer;
