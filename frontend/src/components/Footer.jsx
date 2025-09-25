import React from "react";
import twitter from "../assets/socialmedia/twitter.png";
import facebook from "../assets/socialmedia/facebook.png";
import instagram from "../assets/socialmedia/instagram.png";
import whatsapp from "../assets/socialmedia/whatsapp.png";
import youtube from "../assets/socialmedia/youtube.png";

const Footer = () => {
  return (
    <footer
      style={{
        margin: "0",
        backgroundColor: "#213547",
        border: "2px solid black",
        padding: "5px",
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "100%",
        overflowX: "hidden",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        color: "white",
      }}
    >
      <p style={{ fontWeight: "600", fontSize: "25px" }}>
        &copy; 2025 Quick Learn Tamziy
      </p>
      <img className="socialmedia" src={twitter} alt="" />
      <img className="socialmedia" src={facebook} alt="" />
      <img className="socialmedia" src={instagram} alt="" />
      <img className="socialmedia" src={whatsapp} alt="" />
      <img className="socialmedia" src={youtube} alt="" />
    </footer>
  );
};

export default Footer;
