import { Box, Button, Grid2, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import background from "../../assets/images/backgroundLibrary.jpg";

export const InitialPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const onNavigate = (text) => {
    switch (text) {
      case "Tableros":
        navigate("/library/boards");
        break;
      case "Salas":
        navigate("/library/studyroomdashboard");
        break;
      case "Accede":
        navigate("/auth/login");
        break;
      case "Registrate":
        navigate("/auth/register");
        break;
      default:
        break;
    }
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 65px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      <Grid2 container justifyContent="center"
        alignItems="center"
      >
        <Grid2 size={{ md: 12 }}>
          <Typography variant="h4" mt={20} sx={{
            fontWeight: 800,
            letterSpacing: ".2rem",
          }}>
            Bienvenido a tu Biblioteca Virtual
          </Typography>
          <Typography variant="h6" mt={1} sx={{
            fontWeight: 800,
            letterSpacing: ".2rem",
          }}>
            Comieza a organizar tu estudio
          </Typography>
        </Grid2>

        <Grid2 size={{ md: 12 }} mt={3}>
          <Box sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Button onClick={(event) => onNavigate(event.target.textContent)} variant="contained" color="primary">
              {isAuthenticated ? "Tableros" : "Accede"}
            </Button>
            <Button onClick={(event) => onNavigate(event.target.textContent)} variant="contained" color="primary">
              {isAuthenticated ? "Salas" : "Registrate"}
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};
