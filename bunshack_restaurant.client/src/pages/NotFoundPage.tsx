import React from "react";
import Layout from "../components/Layout";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Breakfast from "../assets/Breakfast.jpg";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="content-wrapper">
        <Container>
          <Box>
            <div className="content">
              <Typography variant="h4">
                Opps...Lost? Let's find you something tasty!
              </Typography>
              <Typography component="p">
                Just like a perfectly steamed bun fresh out of the pot, some
                things are best when they are fresh and hot. Unfortunately, this
                page isn't one of them. Our buns are steamed to perfection, but
                this page seems to have floated away!
              </Typography>
              <Typography component="p">
                While you're here, why not check our{" "}
                <StyledLink to="/menu">MENU</StyledLink> for some delicious
                breakfast options?
              </Typography>
              <img src={Breakfast} alt="Breakfast" />
            </div>
          </Box>
        </Container>
      </div>
    </Layout>
  );
};

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "goldenrod",
  fontWeight: "bold",
  "&:hover": { color: "red" },
});

export default NotFoundPage;
