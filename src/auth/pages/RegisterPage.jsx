import { AuthLayout } from "../layouts/AuthLayout";
import { Grid2, Button, TextField, Typography } from "@mui/material";

export const RegisterPage = () => {
  return (
    <AuthLayout isLogin={false}>
      <Grid2 container spacing={2} size={{ md: 6 }} margin={2}>
        <Typography variant="h4" fontWeight="bold">
          Registro
        </Typography>
        <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
          <TextField
            label="Nombre completo"
            type="text"
            placeholder="John Doe"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
          <TextField
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
          <TextField
            label="Confirmar contraseña"
            type="password"
            placeholder="Contraseña"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ mt: 2, px: 0.5 }}>
          <Button variant="contained" fullWidth>
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
  );
};
