import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from "../../store/thunks/authThunks";
import { useEffect, useState } from "react";
import libraryIcon from "../../assets/images/libraryIcon.png"

export const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pages, setPages] = useState([])
  const [settings, setSettings] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      setPages(["Inicio", "Tableros", "Salas"]);
      setSettings(["Perfil", "Logout"])
    } else {
      setPages([]);
      setSettings([]);
    };
  }, [isAuthenticated]);

  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = ({ target }) => {
    setAnchorElNav();
    switch (target.textContent) {
      case "Salas":
        navigate("/library/studyroomdashboard");
        break;
      case "Tableros":
        navigate("/library/boards");
        break;
      case "Inicio":
        navigate("/library");
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = ({ target }) => {
    setAnchorElUser();

    switch (target.textContent) {
      case "Logout":
        dispatch(logoutThunk());
        break;
      case "Perfil":
        navigate("/library/user");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar sx={{ alignItems: "center" }}>
          {/* Icono aplicación */}
          <Box
            component="img"
            src={libraryIcon}
            alt="libraryIcon"
            sx={{
              height: 32,
              width: 32,
              mr: 2,
              display: "flex",
              alignSelf: "center",
            }}
          />

          {/* Para moviles */}
          {/* Icono menu desplegable */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/* Tamaño pantalla ordenador */}
          {/* Paginas en en el menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* texto login */}
          <Box
            sx={{
              flexGrow: 0,
              display: isAuthenticated ? "none" : "flex",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                cursor: "pointer"
              }}
              onClick={() => navigate("/auth/login")}
            >
              LOGIN
            </Typography>
          </Box>

          {/* settings */}
          <Box
            sx={{
              flexGrow: 0,
              display: !isAuthenticated ? "none" : "flex",
            }}
          >
            <Tooltip title="Configuración">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
