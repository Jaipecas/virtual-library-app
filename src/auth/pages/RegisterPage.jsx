import { AuthLayout } from "../layouts/AuthLayout";
import { Grid2, Button, TextField, Typography, Alert } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from "../../store/thunks/authThunks";
import { useEffect } from "react";
import { setError } from "../../store/slices/authSlice";

export const RegisterPage = () => {
  const { error, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { formState, onInputChange, onFormSubmitted } = useForm({}, true);
  const navigate = useNavigate();

  const onregisterFormSubmitted = (event) => {
    const isSubmitted = onFormSubmitted(event);

    if (isSubmitted) onregister();
  };

  const onregister = () => {
    dispatch(registerThunk({
      userName: formState.userName,
      email: formState.email,
      password: formState.password,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/library");

  }, [isAuthenticated, navigate]);

  useEffect(() => {
    
    return () => {
      dispatch(setError(null));
    }
  }, [])

  return (
    <form onSubmit={onregisterFormSubmitted}>
      <AuthLayout isLogin={false}>
        <Grid2 container spacing={2} size={{ md: 6 }} margin={2}>
          <Typography variant="h4" fontWeight="bold">
            Registro
          </Typography>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="userName"
              label="UserName"
              type="text"
              placeholder="userName"
              onChange={onInputChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="email"
              label="Correo"
              type="email"
              placeholder="user@email.com"
              onChange={onInputChange}
              fullWidth
              error={formState.emailError}
              helperText={formState.emailError ? formState.emailError : ""}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="password"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              onChange={onInputChange}
              fullWidth
              error={formState.passwordError ? true : false}
              helperText={formState.passwordError ? formState.passwordError : ""}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              placeholder="Contraseña"
              onChange={onInputChange}
              fullWidth
              error={formState.confirmPasswordError ? true : false}
              helperText={formState.confirmPasswordError ? formState.confirmPasswordError : ""}
            />
          </Grid2>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2, px: 0.5 }}>
            <Button type="submit" variant="contained" fullWidth>
              Registrar
            </Button>
          </Grid2>
          <Grid2
            container
            justifyContent="flex-end"
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          ></Grid2>
          <Grid2
            container
            justifyContent="flex-end"
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          ></Grid2>
        </Grid2>
      </AuthLayout>
    </form>
  );
};
