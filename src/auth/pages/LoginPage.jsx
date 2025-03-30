import { Google } from "@mui/icons-material";
import { Grid2, Typography, Button, TextField, Alert } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from "../../store/thunks/authThunks";
import { useEffect } from "react";

export const LoginPage = () => {
  const { error, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { formState, onInputChange, onFormSubmitted } = useForm();
  const navigate = useNavigate();

  const onLoginFormSubmitted = (event) => {
    const isSubmitted = onFormSubmitted(event);

    if (isSubmitted) onLogin();
  };
  
  const onLogin = () => {
    const user = {
      email: formState.email,
      password: formState.password,
    };

    dispatch(loginThunk(user));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/library");

  }, [isAuthenticated, navigate]);

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
          {error && <Alert severity="error">{error}</Alert>}
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
