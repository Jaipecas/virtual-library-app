import { Google } from "@mui/icons-material";
import { Grid2, Typography, Button, TextField, Alert } from "@mui/material";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../context/AuthContext";
import { AuthLayout } from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { formState, onInputChange, onFormSubmitted } = useForm();
  const { authState, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const user = {
      email: formState.email,
      password: formState.password,
    };

    login(user);

    if (authState.isAuthenticated) navigate("/library");
  };

  const onLoginFormSubmitted = (event) => {
    const isSubmitted = onFormSubmitted(event);

    if (isSubmitted) onLogin();
  };

  return (
    <form onSubmit={onLoginFormSubmitted}>
      <AuthLayout isLogin={true}>
        <Grid2 container spacing={2} size={{ md: 6 }} margin={2}>
          <Typography variant="h4" fontWeight="bold">
            Login
          </Typography>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              name="email"
              label="Correo"
              type="text"
              placeholder="correo@google.com"
              fullWidth
              value={formState.email}
              onChange={onInputChange}
              error={formState.emailError}
              helperText={formState.emailError ? formState.emailError : ""}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              name="password"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={formState.password}
              onChange={onInputChange}
              error={formState.passwordError ? true : false}
              helperText={formState.passwordError ? formState.passwordError : ""}
            />
          </Grid2>
          {authState.error && <Alert severity="error">{authState.error}</Alert>}
          <Grid2 size={{ xs: 12, md: 6 }} sx={{ mt: 2, px: 0.5 }}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }} sx={{ mt: 2, px: 0.5 }}>
            <Button type="submit" variant="contained" fullWidth>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid2>
        </Grid2>
      </AuthLayout>
    </form>
     
  );
};
