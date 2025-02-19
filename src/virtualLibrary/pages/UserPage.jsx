import { Grid2, Typography, Box, TextField } from "@mui/material";
import profileMan from "../../assets/images/profileMan.png";
import profileWoman from "../../assets/images/profileWoman.png";
import previous from "../../assets/images/previous.png";
import next from "../../assets/images/next.png";
import { useState } from "react";

const logos = [profileMan, profileWoman];

export const UserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(0);

  const onClickShowPass = () => setShowPassword((prev) => !prev);

  const onPreviousLogo = () => {
    setSelectedLogo((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
  };

  const onNextLogo = () => {
    setSelectedLogo((prev) => {
      if (prev === logos.length - 1) return logos.length - 1;
      return prev + 1;
    });
  };

  return (
    <Grid2
      container
      sx={{ mt: 10 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid2
        container
        size={{ xs: 12, md: 6 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid2 size={{ xs: 12 }} container justifyContent="center" spacing={2}>
          <Box
            component="img"
            src={logos[selectedLogo]}
            alt="Logo"
            sx={{
              width: "30%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          sx={{ mt: 3 }}
          container
          justifyContent="center"
          spacing={2}
        >
          <Box
            component="img"
            src={previous}
            alt="Logo"
            sx={{
              width: "7%",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={onPreviousLogo}
          />
          <Box
            component="img"
            src={next}
            alt="Logo"
            sx={{
              width: "7%",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={onNextLogo}
          />
        </Grid2>
      </Grid2>
      <Grid2 container size={{ xs: 12, md: 6 }} spacing={2}>
        <Grid2 size={{ xs: 10 }}>
          <Typography variant="h3">Perfil</Typography>
        </Grid2>
        <Grid2 size={{ xs: 10 }}>
          <TextField
            name="userName"
            label="UserName"
            type="text"
            placeholder="Usernname"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 10 }}>
          <TextField
            name="email"
            label="Correo"
            type="text"
            placeholder="correo@google.com"
            fullWidth
          />
        </Grid2>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={onClickShowPass}
        >
          ¿Quieres cambiar tu contraseña?
        </Typography>
        <Grid2 size={{ xs: 10 }} sx={{ display: showPassword ? "" : "none" }}>
          <TextField
            name="password"
            label="Contraseña"
            type="text"
            placeholder="contraseña"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 10 }} sx={{ display: showPassword ? "" : "none" }}>
          <TextField
            name="confirmPassword"
            label="Confirmar contraseña"
            type="text"
            placeholder="contraseña"
            fullWidth
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
