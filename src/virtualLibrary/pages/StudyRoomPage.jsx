import {
  Grid2,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "../../hooks/useForm";
import DeleteIcon from "@mui/icons-material/Delete";

//TODO borrar
const studyrooms = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 7", "Sala 8"];
const users = ["japerez@gmail.com", "pepe@gmail.com"];

export const StudyRoomPage = () => {
  const [searchError, setSearchError] = useState(false);
  const [open, setOpen] = useState(false);
  const { formState, onInputChange, resetForm } = useForm({}, false);
  const [selectedUsers, setselectedUsers] = useState([]);

  const onOpenDialog = () => {
    setOpen((prev) => !prev);
    setselectedUsers([]);
    resetForm()
  };

  const onSearchUser = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      if (selectedUsers.includes(formState.searchUser)) return;

      //TODO hacer llamada a Backend
      const user = users.find((email) => formState.searchUser === email);

      if (user != null) {
        setselectedUsers((prev) => [...prev, user]);
        setSearchError(false);
      } else {
        setSearchError(true);
      }
    }
  };

  const onDeleteUser = (userEmail) => {
    setselectedUsers((prev) => prev.filter((user) => user !== userEmail));
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <Button type="button" variant="outlined">
          Añadir Sala
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">Salas creadas</Typography>
        <Divider />
      </Grid2>
      <Grid2 container size={{ xs: 12 }} spacing={2}>
        {studyrooms.map((room) => (
          //TODO cambiar key
          <Button
            key={room}
            variant="outlined"
            startIcon={<MenuBookIcon />}
            onClick={onOpenDialog}
          >
            {room}
          </Button>
        ))}
      </Grid2>

      <Dialog open={open}>
        <DialogTitle>Sala de estudio</DialogTitle>

        <DialogContent>
          <form>
            <TextField
              margin="dense"
              name="name"
              label="Nombre"
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="description"
              label="Descripción"
              type="text"
              multiline
              rows={4}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="time"
              type="time"
              label="Tiempo del pomodoro"
              defaultValue="00:00"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="brackTime"
              type="time"
              label="Tiempo de descanso"
              defaultValue="00:00"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="searchUser"
              label="Buscar usuario"
              variant="outlined"
              onKeyDown={onSearchUser}
              onChange={onInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onSearchUser}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {searchError && (
              <Alert severity="error">Usuario no encontrado</Alert>
            )}
            <List>
              {/* TODO PONER IDS */}
              {selectedUsers.map((user, index) => (
                <ListItem
                  key={index}
                  sx={{ backgroundColor: "#e0f7fa", marginBottom: "8px" }}
                >
                  <ListItemText primary={user} />

                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDeleteUser(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Entrar
          </Button>
          <Button onClick={onOpenDialog} color="primary">
            Cancelar
          </Button>
          <Button type="button" variant="contained" color="error">
            borrar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};
