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
import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "../../hooks/useForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../auth/context/AuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { getStudyRooms } from "../../store/thunks/studyRoomThunks";

//TODO borrar
//TODO se podría sacar el Dialog a un componente
const users = ["japerez@gmail.com", "pepe@gmail.com"];

export const StudyRoomPage = () => {
  const [searchError, setSearchError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const { formState, onInputChange, resetForm, setFormState } = useForm({}, false);

  const { authState } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { studyRooms, loading, apiError } = useSelector((state) => state.studyRoom);

  useEffect(() => {
    dispatch(getStudyRooms(authState.user.id));
  }, []);

  useEffect(() => {
    setFormState(selectedRoom);
  }, [selectedRoom]);
  

  const onOpenDialog = (room) => {
    setSelectedRoom(room);
    setOpen((prev) => !prev);
  };

  const onCloseDialog = () => {
    setOpen((prev) => !prev);
    setselectedUsers([]);
    resetForm();
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

  const onCreateRoom = async (event) => {
    event.preventDefault();

    const room = {
      name: formState.name,
      description: formState.description,
      //TODO cambiar por busqueda de user
      usersIds: ["26213fac-098b-4b93-9f67-0b3a57c45e9a"],
      pomodoro: {
        name: "",
        PomodoroTime: new Date(),
        BreakTime: new Date(),
      },
      ownerId: authState.user.id,
    }

    try {
       //llamar a la api 

      onCloseDialog();
    } catch (error) {
      setSearchError(true);
    } finally {
      setSearchError(false);
    }
  };

  const onDeleteRoom = () => {
    //TODO tiene que buscar por Id no por name

    const room = studyRooms.find((room) => room.name === formState.name);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <Button type="button" variant="outlined" onClick={onOpenDialog}>
          Añadir Sala
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">Salas creadas</Typography>
        <Divider />
      </Grid2>
      <Grid2 container size={{ xs: 12 }} spacing={2}>
        {studyRooms.map((room) => (
          //TODO cambiar key por Id
          <Button
            key={room.id}
            variant="outlined"
            startIcon={<MenuBookIcon />}
            onClick={() => onOpenDialog(room)}
          >
            {room.name}
          </Button>
        ))}
      </Grid2>

      <Dialog open={open}>
        <DialogTitle>Sala de estudio</DialogTitle>

        <DialogContent>
          <form onSubmit={onCreateRoom}>
            <TextField
              margin="dense"
              name="name"
              label="Nombre"
              value={formState.name}
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
              value={formState.description}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="time"
              type="time"
              label="Tiempo del pomodoro"
              defaultValue="00:00"
              value={formState.time}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="breackTime"
              type="time"
              label="Tiempo de descanso"
              defaultValue="00:00"
              value={formState.breackTime}
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
            <DialogActions>
              <Button type="submit" color="primary">
                Entrar
              </Button>
              <Button onClick={onCloseDialog} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={onDeleteRoom}
                type="button"
                variant="contained"
                color="error"
              >
                borrar
              </Button>
            </DialogActions>
          </form>
          {apiError && (
            <Alert severity="error">Error en la api</Alert>
          )}
        </DialogContent>
      </Dialog>
    </Grid2>
  );
};
