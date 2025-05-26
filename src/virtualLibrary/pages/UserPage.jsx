import { Grid2, Typography, Box, TextField, Button, Alert } from "@mui/material";
import profileMan from "../../assets/images/profileMan.png";
import profileWoman from "../../assets/images/profileWoman.png";
import previous from "../../assets/images/previous.png";
import next from "../../assets/images/next.png";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from "../../store/thunks/authThunks";
import { setError } from "../../store/slices/authSlice";

const logos = [profileMan, profileWoman];
const logosNames = ["profileMan", "profileWoman"];

export const UserPage = () => {
  const { user, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [selectedLogo, setSelectedLogo] = useState(logosNames.indexOf(user.logo));
  const [showPassword, setShowPassword] = useState(false);
  const { formState, onInputChange, onFormSubmitted } = useForm(
    {
      userName: user.userName || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
    },
    showPassword
  );
  const navigate = useNavigate();

  const onUpdateUserFormSubmitted = (event) => {
    const isSubmitted = onFormSubmitted(event);

    if (isSubmitted) onUpdateUser();
  };

  const onUpdateUser = async () => {

    dispatch(updateUserThunk({
      CurrentUserName: user.userName,
      CurrentEmail: user.email,
      NewUserName: formState.userName,
      NewEmail: formState.email,
      NewPassword: formState.password,
      logo: logosNames[selectedLogo],
    }));
  };

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


  useEffect(() => {

    if (error == "") {
      navigate("/library")
    }

  }, [error])

  useEffect(() => {

    return () => {
      dispatch(setError(null));
    }
  }, [])

  return (
    <form onSubmit={onUpdateUserFormSubmitted}>
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
          <Grid2
            size={{ xs: 12 }}
            container
            justifyContent="center"
            spacing={2}
          >
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
              placeholder="userName"
              value={formState.userName}
              onChange={onInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 10 }}>
            <TextField
              name="email"
              label="Correo"
              type="email"
              placeholder="user@email.com"
              value={formState.email}
              onChange={onInputChange}
              fullWidth
              error={formState.emailError}
              helperText={formState.emailError ? formState.emailError : ""}
              InputLabelProps={{ shrink: true }}
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
              type="password"
              placeholder="Contraseña"
              onChange={onInputChange}
              fullWidth
              error={formState.passwordError ? true : false}
              helperText={
                formState.passwordError ? formState.passwordError : ""
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 10 }} sx={{ display: showPassword ? "" : "none" }}>
            <TextField
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              placeholder="Contraseña"
              onChange={onInputChange}
              fullWidth
              error={formState.confirmPasswordError ? true : false}
              helperText={
                formState.confirmPasswordError
                  ? formState.confirmPasswordError
                  : ""
              }
            />
          </Grid2>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid2 size={{ xs: 10 }} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" fullWidth>
              Actualizar
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </form>
  );
};
