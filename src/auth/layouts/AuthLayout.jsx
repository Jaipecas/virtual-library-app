import { Grid2, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AuthLayout = ({ children, isLogin }) => {
  const navigate = useNavigate();
  const buttonRoute = isLogin ? "/auth/register" : "/auth/login";

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        height: "100vh",
        margin: "5px",
      }}
    >
      <Grid2
        size={{ xs: 12, md: 8 }}
        sx={{
          height: "100vh",
          background: "linear-gradient(90deg, #9ae9f3, #15acbd)",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 4 }}
        sx={{
          height: "100vh",
          background: "linear-gradient(90deg, #ff7eb3, #ff758c)",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid2>
            <Typography variant="h4" fontWeight="bold">
              {isLogin ? "¿Aún no te has registrado?" : "¿Ya estas registrado?"}
            </Typography>
          </Grid2>
          <Grid2>
            <Button variant="contained" onClick={() => navigate(buttonRoute)}>
              {isLogin ? "Registrarse" : "Login"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
