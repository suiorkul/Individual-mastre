import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button, TextField } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HomeIcon from "@mui/icons-material/Home";
import ReviewsIcon from "@mui/icons-material/Reviews";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";
import { useAuth } from "../contexts/AuthContextProvider";
import { useCart } from "../contexts/CartContextProvider";
import { useFavorite } from "../contexts/FavoriteContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/styles";
import { styled, alpha } from "@mui/material/styles";
import { useLocation, useSearchParams } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const useStyles = makeStyles({
  input: {
    color: "white",
  },
  root: {
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "gray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
  },
});

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { currentUser, logOutUser } = useAuth();
  const { getCartLength, cartLength, getCart } = useCart();
  const { fav, getFav } = useFavorite();
  const [length, setLength] = React.useState(0);
  const [sModal, setSModal] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [inpSearch, setInpSearch] = React.useState(searchParams.get("q") || "");

  function toggle() {
    sModal ? setSModal(false) : setSModal(true);
  }

  React.useEffect(() => {
    let currentParams = Object.fromEntries([...searchParams]);
    if (location.pathname === "/menu") {
      setSearchParams({
        ...currentParams,
        _page: 1,
        q: inpSearch,
      });
    }
  }, [inpSearch]);

  React.useEffect(() => {
    getCart();
    getCartLength();
  }, []);
  React.useEffect(() => {
    getFav();
  }, []);
  React.useEffect(() => {
    if (fav) setLength(fav.products.length);
  }, [fav]);

  React.useEffect(() => {
    if (location.pathname !== "/menu") {
      sModal && setSModal(false);
      setInpSearch("");
    }
  }, [searchParams]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CloseIcon onClick={handleMenuClose} sx={{ marginRight: "5px" }} />
      </div>
      {currentUser?.isLogged && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <NavLink to="/blogs" className="mobile-link">
            <p
              onClick={() => {
                handleMobileMenuClose();
                handleMenuClose();
                logOutUser();
              }}
            >
              Log out
            </p>
          </NavLink>
        </MenuItem>
      )}
      {currentUser?.isLogged && (
        <MenuItem className="menuitem" onClick={handleMenuClose}>
          <div
            className="mobile-link"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              color: "black",
            }}
          >
            <AccountCircle sx={{ marginRight: "10px" }} />
            {currentUser.user}
          </div>
        </MenuItem>
      )}

      {!currentUser?.isLogged && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <HowToRegIcon />
          </IconButton>
          <NavLink to="/register" className="mobile-link">
            <p
              onClick={() => {
                handleMobileMenuClose();
                handleMenuClose();
              }}
            >
              Register
            </p>
          </NavLink>
        </MenuItem>
      )}
      {!currentUser?.isLogged && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LoginIcon />
          </IconButton>
          <NavLink to="/login" className="mobile-link">
            <p
              onClick={() => {
                handleMobileMenuClose();
                handleMenuClose();
              }}
            >
              Login
            </p>
          </NavLink>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      sx={{ backgroundColor: "black" }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CloseIcon
          onClick={handleMobileMenuClose}
          sx={{ marginRight: "5px" }}
        />
      </div>
      {/*===> here is my items */}
      <MenuItem className="menuitem">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <HomeIcon />
        </IconButton>
        <NavLink to="/" className="mobile-link">
          <p onClick={handleMobileMenuClose}>Home</p>
        </NavLink>
      </MenuItem>
      <MenuItem className="menuitem">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <InfoIcon />
        </IconButton>
        <NavLink to="/about" className="mobile-link">
          <p onClick={handleMobileMenuClose}>About</p>
        </NavLink>
      </MenuItem>
      <MenuItem className="menuitem">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <RestaurantMenuIcon />
        </IconButton>
        <NavLink to="/menu" className="mobile-link">
          <p onClick={handleMobileMenuClose}>Menu</p>
        </NavLink>
      </MenuItem>
      <MenuItem className="menuitem">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <ReviewsIcon />
        </IconButton>
        <NavLink to="/reviews" className="mobile-link">
          <p onClick={handleMobileMenuClose}>Reviews</p>
        </NavLink>
      </MenuItem>
      <MenuItem className="menuitem">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <NewReleasesIcon />
        </IconButton>
        <NavLink to="/blogs" className="mobile-link">
          <p onClick={handleMobileMenuClose}>Blogs</p>
        </NavLink>
      </MenuItem>
      {currentUser.isAdmin && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <AdminPanelSettingsIcon />
          </IconButton>
          <NavLink to="/admin" className="mobile-link">
            <p onClick={handleMobileMenuClose}>Admin</p>
          </NavLink>
        </MenuItem>
      )}
      {currentUser.isLogged && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <NavLink to="/blogs" className="mobile-link">
            <p
              onClick={() => {
                handleMobileMenuClose();
                logOutUser();
              }}
            >
              Log out
            </p>
          </NavLink>
        </MenuItem>
      )}

      {!currentUser?.isLogged && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <HowToRegIcon />
          </IconButton>
          <NavLink to="/register" className="mobile-link">
            <p
              onClick={() => {
                handleMobileMenuClose();
              }}
            >
              Register
            </p>
          </NavLink>
        </MenuItem>
      )}

      {currentUser?.isLogged && (
        <MenuItem className="menuitem" onClick={handleMenuClose}>
          <NavLink to="/register" className="mobile-link">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                color: "black",
              }}
            >
              <AccountCircle sx={{ marginRight: "10px" }} />
              {currentUser.user}
            </div>
          </NavLink>
        </MenuItem>
      )}
      {!currentUser?.isLogged && (
        <MenuItem className="menuitem">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LoginIcon />
          </IconButton>
          <NavLink to="/login" className="mobile-link">
            <p
              onClick={() => {
                handleMobileMenuClose();
              }}
            >
              Login
            </p>
          </NavLink>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar position="static" className="navbar-container">
        <Toolbar>
          <Box sx={{ width: "40px" }} />
          {sModal ? (
            <FontAwesomeIcon
              onClick={() => {
                toggle();
              }}
              icon={faXmark}
              className="xmark"
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => {
                toggle();
              }}
              className="searchIcon"
              color="white"
              icon={faMagnifyingGlass}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              className="btn"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
              component={NavLink}
              to="/"
            >
              HOME
            </Button>
            <Button
              className="btn"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
              component={NavLink}
              to="/about"
            >
              ABOUT
            </Button>
            <Button
              className="btn"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
              component={NavLink}
              to="/menu"
            >
              MENU
            </Button>
            <Button component={Link} to="/">
              <img height="30px" src={logo} alt="" />
            </Button>
            <Button
              className="btn"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
              component={NavLink}
              to="/reviews"
            >
              REVIEWS
            </Button>
            <Button
              className="btn"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontSize: "16px",
              }}
              component={NavLink}
              to="/blogs"
            >
              BLOGS
            </Button>
            {currentUser?.isAdmin && (
              <Button
                className="btn"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "16px",
                  color: "red",
                }}
                component={NavLink}
                to="/admin  "
              >
                ADMIN
              </Button>
            )}
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link to="/favorite">
              <Badge
                badgeContent={currentUser.isLogged ? length : null}
                color="primary"
                style={{ marginRight: "15px" }}
              >
                <BookmarksIcon sx={{ color: "yellow" }} />
              </Badge>
            </Link>
            <Link to="/cart">
              <Badge
                badgeContent={currentUser.isLogged ? +cartLength : null}
                color="primary"
              >
                <ShoppingCartIcon sx={{ color: "yellow" }} />
              </Badge>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser.isAdmin ? (
                <AdminPanelSettingsIcon style={{ color: "yellow" }} />
              ) : !currentUser.isLogged ? (
                <NoAccountsIcon style={{ color: "yellow" }} />
              ) : (
                <AccountCircle style={{ color: "yellow" }} />
              )}
            </IconButton>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <Link to="/favorite">
              <Badge
                badgeContent={currentUser.isLogged ? length : null}
                color="primary"
                style={{ marginRight: "15px" }}
              >
                <BookmarksIcon sx={{ color: "yellow" }} />
              </Badge>
            </Link>
            <Link to="/cart">
              <Badge
                badgeContent={currentUser.isLogged ? +cartLength : null}
                color="primary"
              >
                <ShoppingCartIcon sx={{ color: "yellow" }} />
              </Badge>
            </Link>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {sModal ? (
        <div
          style={{
            width: "900px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            className={classes.root}
            inputProps={{ className: classes.input }}
            rows={1}
            name="title"
            value={inpSearch}
            onChange={(e) => setInpSearch(e.target.value)}
            sx={{
              width: "90%",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "rgba(128, 128, 128, 0.223)",
              input: { color: "white" },
              position: "absolute",
            }}
          />
        </div>
      ) : null}
    </Box>
  );
}
