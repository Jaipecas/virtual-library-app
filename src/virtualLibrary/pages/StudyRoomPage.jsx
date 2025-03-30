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
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "../../hooks/useForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { createStudyRoom, deleteStudyRoom, getStudyRooms, updateStudyRoom } from "../../store/thunks/studyRoomThunks";

//TODO borrar
//TODO se podría sacar el Dialog a un componente
const users = ["japerez@gmail.com", "pepe@gmail.com"];

export const StudyRoomPage = () => {
  const [searchError, setSearchError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const { formState, onInputChange, resetForm, setFormState } = useForm({}, false);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { studyRooms, loading, error } = useSelector(state => state.studyRoom);

  useEffect(() => {
    dispatch(getStudyRooms(user.id));
  }, []);

  useEffect(() => {
    if (Object.keys(selectedRoom).length) {

      const form = {
        name: selectedRoom.name,
        description: selectedRoom.description,
        time: selectedRoom.pomodoro.pomodoroTime,
        breakTime: selectedRoom.pomodoro.breakTime
      }
      setFormState(form);
      setselectedUsers(selectedRoom.users)
    } else {
      setFormState({});
      setselectedUsers([])
    }
  }, [selectedRoom]);


  const onOpenDialog = (room) => {
    setSelectedRoom(room);
    setOpen((prev) => !prev);
  };

  const onCloseDialog = () => {
    setSelectedRoom({});
    setOpen((prev) => !prev);
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

  const onSetRoom = async (event) => {
    event.preventDefault();

    if (Object.keys(selectedRoom).length) {
      const room = {
        id: selectedRoom.id,
        name: formState.name,
        description: formState.description,
        //TODO cambiar por busqueda de user
        usersIds: ["f8c22f37-185f-4c1f-b01e-ca6e218d4d78"],
        pomodoro: {
          name: "",
          pomodoroTime: formState.time,
          breakTime: formState.breakTime,
        }
      }
      dispatch(updateStudyRoom(room))
    } else {
      const room = {
        name: formState.name,
        description: formState.description,
        //TODO cambiar por busqueda de user
        usersIds: ["f8c22f37-185f-4c1f-b01e-ca6e218d4d78"],
        pomodoro: {
          name: "",
          pomodoroTime: formState.time,
          breakTime: formState.breakTime,
        },
        ownerId: user.id,
      }
      //TODO revisar si da error al crear
      dispatch(createStudyRoom(room));
    }

    onCloseDialog();

  };

  const onDeleteRoom = () => {
    dispatch(deleteStudyRoom(selectedRoom.id));
    onCloseDialog();
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <Button type="button" variant="outlined" onClick={() => onOpenDialog({})}>
          Añadir Sala
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">Salas creadas</Typography>
        <Divider />
      </Grid2>
      <Grid2 container size={{ xs: 12 }} spacing={2}>
        {studyRooms?.map((room) => (
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
          <form onSubmit={onSetRoom}>
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
              type="number"
              label="Tiempo del pomodoro (minutos)"
              value={formState.time}
              onChange={onInputChange}
              inputProps={{
                min: 1,
                max: 120,
                step: 1,
              }}
              fullWidth
            />
            <TextField
              margin="dense"
              name="breakTime"
              type="number"
              label="Tiempo de descanso (minutos)"
              value={formState.breakTime}
              onChange={onInputChange}
              inputProps={{
                min: 1,
                max: 60,
                step: 1,
              }}
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
              {selectedUsers?.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{ backgroundColor: "#e0f7fa", marginBottom: "8px" }}
                >
                  <ListItemText primary={user.email} />

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
          {error && (
            <Alert severity="error">{error}</Alert>
          )}
        </DialogContent>
      </Dialog>
    </Grid2>
  );
};
