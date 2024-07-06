import React from "react";
import { Box, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import ShareIcon from "@mui/icons-material/Share";
import { encode } from "punycode";

const Footer: React.FC = () => {
  const handleGoogleClick = () => {
    window.open("https://maps.app.goo.gl/TnNeeNeMV46hNAj87", "_blank");
  };

  const handleShareClick = () => {
    const subject = encode("Check out BunShack Breakfast");
    const body = encode(
      "I found this amazing breakfast place called BunShack Breakfast. You should check it out!"
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/bunshack/?hl=en", "_blank");
  };

  const handleXClick = () => {
    window.open("https://x.com/", "_blank");
  };

  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
      >
        <Box
          sx={{
            my: 3,
            "& svg": { fontSize: "40px", cursor: "pointer", mr: 2 },
            "& svg: hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          <InstagramIcon onClick={handleInstagramClick} />
          <XIcon onClick={handleXClick} />
          <GoogleIcon onClick={handleGoogleClick} />
          <ShareIcon onClick={handleShareClick} />
        </Box>
        <Typography
          variant="h6"
          sx={{ "@media (max-width:600px)": { fontSize: "1rem" } }}
        >
          All Rights Reserved &copy; 2024 BunShack Breakfast
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
