import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Banner from "../assets/Banner.jpg";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
        <div className="headerContainer">
          <h1>Welcome to BunShack Breakfast</h1>
          <p>Discover our story, explore our menu, and order now!</p>
          <Link to="/menu">
            <button>VIEW MENU</button>
            <br />
            <button>ORDER NOW</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
