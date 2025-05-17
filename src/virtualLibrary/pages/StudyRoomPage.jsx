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
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "../../hooks/useForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { createStudyRoom, deleteInvitedRoomThunk, deleteStudyRoom, getInvitedStudyRooms, getStudyRooms, updateStudyRoom } from "../../store/thunks/studyRoomThunks";
import { getUserData } from "../../store/thunks/userThunks";
import { useNavigate } from "react-router-dom";
import { clearOperationStatus, setError, setSelectedChatRoom } from "../../store/slices/studyRoomSlice";
import { GridMoreVertIcon } from "@mui/x-data-grid";

//TODO borrar
//TODO se podría sacar el Dialog a un componente

export const StudyRoomPage = () => {

  const [searchError, setSearchError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [action, setAction] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuInvitedRoomId, setMenuInvitedRoomId] = useState(null);

  const navigate = useNavigate();

  const { formState, onInputChange, setFormState } = useForm({}, false);

  const { user } = useSelector(state => state.auth);
  const { userData } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const { studyRooms, invitedRooms, error, status } = useSelector(state => state.studyRoom);

  const clickedButtonTextRef = useRef("");

  //Carga inicial
  useEffect(() => {
    dispatch(getStudyRooms(user.id));
    dispatch(getUserData(user.id));
    dispatch(getInvitedStudyRooms(user.id));

    return () => {
      dispatch(setError(null));
      setSearchError(null);
    }
  }, []);

  //Efecto al cambiar la room
  useEffect(() => {
    if (Object.keys(selectedRoom).length) {

      const form = {
        name: selectedRoom.name,
        description: selectedRoom.description,
        time: selectedRoom.pomodoro.pomodoroTime,
        breakTime: selectedRoom.pomodoro.breakTime
      }
      setFormState(form);

      const users = selectedRoom.users.filter(user => user.id !== selectedRoom.owner.id);
      setselectedUsers(users)
    } else {
      setFormState({});
      setselectedUsers([])
    }
  }, [selectedRoom]);

  //si create/update/delete es success se cierra el dialog o se navega a la room
  useEffect(() => {

    if (status !== "success") return;

    if (clickedButtonTextRef.current === "ACTUALIZAR" || clickedButtonTextRef.current === "CREAR" || clickedButtonTextRef.current === "BORRAR") {
      onCloseDialog();
      dispatch(clearOperationStatus());
      dispatch(setError(null));
    }

    if (Object.keys(selectedRoom).length && clickedButtonTextRef.current === "ENTRAR") {
      onEnterRoom(selectedRoom.id);
      dispatch(clearOperationStatus());
      dispatch(setError(null));
    }

  }, [status]);


  const onOpenDialog = (room) => {
    setAction(Object.keys(room).length ? "update" : "create");
    setSelectedRoom(room);
    setOpen((prev) => !prev);
  };

  const onCloseDialog = () => {
    setSelectedRoom({});
    setOpen((prev) => !prev);
    setSearchError(null);
  };

  const onSearchUser = (event) => {

    if (event.key === "Enter") {
      event.preventDefault();
    }

    if (event.key === "Enter" || event.type === "click") {
      if (selectedUsers.map(user => user.userName).includes(formState.searchUser)) {
        setSearchError(`${formState.searchUser} ya ha sido añadido a la sala`);
        return;
      }

      const user = userData.friends.find((user) => formState.searchUser === user.userName);

      if (user != null) {
        setselectedUsers((prev) => [...prev, user]);
        setSearchError(null);
      } else {
        setSearchError("Usuario no encontrado");
      }
    }
  };

  const onDeleteUser = (userEmail) => {
    setselectedUsers((prev) => prev.filter((user) => user !== userEmail));
  };

  const onSetRoom = async (event) => {
    event.preventDefault();

    const submitter = event.nativeEvent.submitter;

    if (event.key === "Enter") return;

    if (Object.keys(selectedRoom).length) {
      const room = {
        id: selectedRoom.id,
        name: formState.name,
        description: formState.description,
        usersIds: selectedUsers?.map(user => user.id),
        pomodoro: {
          pomodoroTime: formState.time === "" ? null : Number(formState.time),
          breakTime: formState.breakTime === "" ? null : Number(formState.breakTime),
        }
      }
      dispatch(updateStudyRoom(room))
      //TODO falta enviar notificaciones a los nuevos users
    } else {
      const room = {
        name: formState.name,
        description: formState.description,
        usersIds: selectedUsers?.map(user => user.id),
        pomodoro: {
          pomodoroTime: formState.time,
          breakTime: formState.breakTime,
        },
        ownerId: user.id,
      };
      dispatch(createStudyRoom(room));
    }

    clickedButtonTextRef.current = submitter?.innerText.toUpperCase();
  };

  const onDeleteRoom = () => {
    dispatch(deleteStudyRoom(selectedRoom.id));
    clickedButtonTextRef.current = "BORRAR";
  };

  const preventEnterSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const onEnterRoom = (roomId) => {
    dispatch(setSelectedChatRoom(null))
    navigate(`/library/roomChatPage?id=${roomId}`);
  }

  const onMenuInvitedRoomClick = (event, room) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuInvitedRoomId(room.id);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
    setMenuInvitedRoomId(null);
  };

  const onDeleteInvitedRoom = () => {
    dispatch(deleteInvitedRoomThunk(menuInvitedRoomId, user.id));
    onMenuClose();
  }

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
            sx={{ padding: 2, paddingX: 8 }}
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
              onKeyDown={preventEnterSubmit}
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
              onKeyDown={preventEnterSubmit}
              fullWidth
            />
            <TextField
              margin="dense"
              name="time"
              type="number"
              label="Tiempo del pomodoro (minutos)"
              value={formState.time}
              onChange={onInputChange}
              onKeyDown={preventEnterSubmit}
              inputProps={{
                min: 1,
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
              onKeyDown={preventEnterSubmit}
              inputProps={{
                min: 1,
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
              <Alert severity="error">{searchError}</Alert>
            )}
            <List>
              {selectedUsers?.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{ backgroundColor: "#e0f7fa", marginBottom: "8px" }}
                >
                  <ListItemText primary={user.userName} />

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
              {action == "update" && (<Button type="submit" color="primary">
                Entrar
              </Button>)}

              <Button type="submit" color="primary">
                {action == "create" ? "Crear" : "Actualizar"}
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


      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">Invitaciones</Typography>
        <Divider />
      </Grid2>
      <Grid2 container size={{ xs: 12 }} spacing={2}>
        {invitedRooms?.map((room) => (
          <Box position={"relative"}>
            <Button
              key={room.id}
              variant="outlined"
              startIcon={<MenuBookIcon />}
              onClick={() => onEnterRoom(room.id)}
              sx={{ padding: 2, paddingX: 8 }}
            >
              {room.name}
            </Button>
            <IconButton
              size="small"
              onClick={(e) => onMenuInvitedRoomClick(e, room)}
              sx={{ position: 'absolute', top: 2, right: 2 }}
            >
              <GridMoreVertIcon color="secondary" />
            </IconButton>
          </Box>

        ))}
      </Grid2>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={onDeleteInvitedRoom}>Eliminar</MenuItem>
      </Menu>
    </Grid2>
  );
};
