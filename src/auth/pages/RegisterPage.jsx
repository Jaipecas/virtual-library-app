import { AuthLayout } from "../layouts/AuthLayout";
import { Grid2, Button, TextField, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { formState, onInputChange } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    login({
      id: 1,
      email: formState.email,
      password: formState.password,
    });

    navigate("/library");
  };

  return (
    <form>
      <AuthLayout isLogin={false}>
        <Grid2 container spacing={2} size={{ md: 6 }} margin={2}>
          <Typography variant="h4" fontWeight="bold">
            Registro
          </Typography>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="email"
              label="Correo"
              type="email"
              placeholder="user@email.com"
              onChange={onInputChange}
              fullWidth
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
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2, px: 0.5 }}>
            <Button onClick={onLogin} variant="contained" fullWidth>
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
