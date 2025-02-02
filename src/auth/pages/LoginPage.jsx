import { Google } from "@mui/icons-material";
import { Grid2, Typography, Button, TextField, Link } from "@mui/material";
import { AuthLayout } from "../layouts/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout isLogin={true}>
      <Grid2 container spacing={2} size={{ md: 6 }} margin={2}>
        <Typography variant="h4" fontWeight="bold">
          Login
        </Typography>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Correo"
            type="email"
            placeholder="correo@google.com"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Confirmar contraseña"
            type="password"
            placeholder="Contraseña"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} sx={{ mt: 2, px: 0.5 }}>
          <Button variant="contained" fullWidth>
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
