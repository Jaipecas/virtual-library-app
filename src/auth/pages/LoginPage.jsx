import { Google } from "@mui/icons-material";
import { Grid2, Typography, Button, TextField, Link } from "@mui/material";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../context/AuthContext";
import { AuthLayout } from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { formState, onInputChange } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const user = {
      id: 1,
      email: formState.email,
      password: formState.password,
    };

    login(user);

    navigate("/")
  };

  return (
    <AuthLayout isLogin={true}>
      <Grid2 container spacing={2} size={{ md: 6 }} margin={2}>
        <Typography variant="h4" fontWeight="bold">
          Login
        </Typography>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            name="email"
            label="Correo"
            type="email"
            placeholder="correo@google.com"
            fullWidth
            value={formState.email}
            onChange={onInputChange}
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
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} sx={{ mt: 2, px: 0.5 }}>
          <Button onClick={onLogin} variant="contained" fullWidth>
            Login
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} sx={{ mt: 2, px: 0.5 }}>
          <Button variant="contained" fullWidth>
            <Google />
            <Typography sx={{ ml: 1 }}>Google</Typography>
          </Button>
        </Grid2>
        <Grid2
          container
          justifyContent="flex-end"
          size={{ xs: 12 }}
          sx={{ mt: 2 }}
        ></Grid2>
      </Grid2>
    </AuthLayout>
  );
};
