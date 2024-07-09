import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { loggedIn, isAdmin, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <SoupKitchenIcon />
        BunShack Breakfast
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <Link to="/">
            <Button>
              <HomeIcon />
              HOME
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <Button>
              <PeopleAltIcon />
              ABOUT
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/menu">
            <Button>
              <MenuBookIcon />
              MENU
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <Button>
              <InfoIcon />
              CONTACT
            </Button>
          </Link>
        </li>
        <li>
          {loggedIn ? (
            <Button onClick={handleClick}>
              <ShoppingCartIcon />
              ORDER
            </Button>
          ) : (
            <Link to="/orders">
              <Button>
                <ShoppingCartIcon />
                ORDER
              </Button>
            </Link>
          )}
        </li>

        <li>
          {isAdmin ? (
            <Link to="/admin">
              <Button>
                <AdminPanelSettingsIcon />
                ADMIN
              </Button>
            </Link>
          ) : null}
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "#1A1A19" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <SoupKitchenIcon />
              BunShack Breakfast
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <Button component={Link} to="/">
                    <HomeIcon />
                    HOME
                  </Button>
                </li>
                <li>
                  <Button component={Link} to="/about">
                    <PeopleAltIcon />
                    ABOUT
                  </Button>
                </li>
                <li>
                  <Button component={Link} to="/menu">
                    <MenuBookIcon />
                    MENU
                  </Button>
                </li>
                <li>
                  <Button component={Link} to="/contact">
                    <InfoIcon />
                    CONTACT
                  </Button>
                </li>
                <li>
                  {loggedIn ? (
                    <Button onClick={handleClick} color="inherit">
                      <ShoppingCartIcon />
                      ORDER
                    </Button>
                  ) : (
                    <Button component={Link} to="/orders">
                      <ShoppingCartIcon />
                      ORDER
                    </Button>
                  )}
                </li>

                <li>
                  {isAdmin ? (
                    <Link to="/admin">
                      <Button color="inherit">
                        <AdminPanelSettingsIcon />
                        ADMIN
                      </Button>
                    </Link>
                  ) : null}
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <StyledLink to="/new-order">New Order</StyledLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <StyledLink to="/orders">My Orders</StyledLink>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{ fontWeight: "bold", color: "green" }}
          >
            Logout
          </MenuItem>
        </Menu>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

const StyledLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  fontWeight: "bold",
  "&:hover": { color: "red" },
});

export default Navbar;
