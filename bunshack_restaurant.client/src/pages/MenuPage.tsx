import React from "react";
import Layout from "../components/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MenuList } from "../components/MenuList";

const MenuPage: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {MenuList.map((menu, id) => (
          <Card key={id} sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "400px" }}
                component="img"
                src={menu.image}
                alt={menu.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {menu.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {menu.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${menu.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default MenuPage;
