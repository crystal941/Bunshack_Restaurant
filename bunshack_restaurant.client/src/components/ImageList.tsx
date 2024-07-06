import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ChefImage from "../assets/Chef.jpg";
import BunImage from "../assets/HotBuns.jpg";
import SteamedBunImage from "../assets/SteamedBuns.jpg";

export default function StandardImageList() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ImageList
      sx={{
        display: "inline-flex",
      }}
      rowHeight={isSmallScreen ? 200 : 600}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: SteamedBunImage,
    title: "Steamed Buns",
  },
  {
    img: ChefImage,
    title: "Chef",
  },
  {
    img: BunImage,
    title: "Hot Buns",
  },
];
