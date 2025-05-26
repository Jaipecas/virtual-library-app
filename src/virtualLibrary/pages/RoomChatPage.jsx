import { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { getRoomUsersThunk, getStudyRoomThunk, updatePomodoroThunk } from "../../store/thunks/studyRoomThunks";
import { Avatar, Button, Grid2, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import pomodoroSound from "../../assets/sounds/pomodoroSound.mp3";
import { RoomChatRoutes } from "../../services/apiRoutes";
import profileMan from "../../assets/images/profileMan.png";
import profileWoman from "../../assets/images/profileWoman.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from "../../themes/theme";


export const RoomChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [showButtonBreakTime, setShowBreakTime] = useState(false);
    const [disableChat, setDisableChat] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const intervalRef = useRef(null);
    const connectionRef = useRef(null);

    const { user } = useSelector(state => state.auth);
    const { selectedRoom, isConnected, connectedUsers } = useSelector(state => state.studyRoom);

    const location = useLocation();
    const dispatch = useDispatch();

    const containerScrollRef = useRef(null);

    useEffect(() => {
        getRoom();

    }, []);

    useEffect(() => {
        if (!selectedRoom) return;
        if (connectionRef.current) return;

        if (selectedRoom.pomodoro.endTime != null && new Date(selectedRoom.pomodoro.endTime).getTime() > Date.now()) syncRoom();

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(RoomChatRoutes.roomChat)
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                sendJoinGroupMessage(selectedRoom.id);
            })
            .catch(err => console.error("Error al conectar con SignalR:", err));

        newConnection.on("JoinedGroup", (user, message) => {
            setMessages(prev => [...prev, { user, message }]);
            dispatch(getRoomUsersThunk({ roomId: selectedRoom.id, isConnected: true }))
        });

        newConnection.on("ReceiveMessage", (user, message) => {
            setMessages(prev => [...prev, { user, message }]);
        });

        newConnection.on("TimerStarted", ({ endTime, disableChat }) => {

            setDisableChat(disableChat);
            updateTimer(endTime);
        });

        newConnection.on("UserDisconnected", (userName) => {
            setMessages(prev => [...prev, { user: `${userName} salió de la sala`, message }]);
            dispatch(getRoomUsersThunk({ roomId: selectedRoom.id, isConnected: true }))
        });

        newConnection.on("RestartTimer", ({ endTime, disableChat }) => {
            setDisableChat(disableChat);
            updateTimer(endTime);
        });

        connectionRef.current = newConnection;

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
                connectionRef.current = null;
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [selectedRoom?.id]);

    //Sirve para scrollear el chat
    useEffect(() => {
        const container = containerScrollRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const getRoom = () => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        dispatch(getStudyRoomThunk(id));
    };

    const sendMessage = async (event) => {
        event.preventDefault();

        if (!message) return;

        if (connectionRef.current) {
            try {
                await connectionRef.current.invoke("SendMessage", selectedRoom.id, user.userName, message);
                setMessage("");
            } catch (err) {
                console.error("Error enviando mensaje:", err);
            }
        }
    };

    const sendJoinGroupMessage = async (roomId) => {
        if (connectionRef.current) {
            try {
                await connectionRef.current.invoke("JoinGroup", roomId, user.id, user.userName);
            } catch (err) {
                console.error("Error uniendo al grupo:", err);
            }
        }
    };

    const studyTimer = async () => {
        if (connectionRef.current) {
            try {
                dispatch(updatePomodoroThunk({ roomId: selectedRoom.id, isStudyTime: true }));
                await connectionRef.current.invoke("StartTimer", selectedRoom.id, new Date(), selectedRoom.pomodoro.pomodoroTime, true);
            } catch (err) {
                console.error("Error iniciando el timer:", err);
            }
        }
    };

    const breakTimer = async () => {
        if (connectionRef.current) {
            try {
                dispatch(updatePomodoroThunk({ roomId: selectedRoom.id, isStudyTime: false }))
                await connectionRef.current.invoke("StartTimer", selectedRoom.id, new Date(), selectedRoom.pomodoro.breakTime, false);
            } catch (err) {
                console.error("Error iniciando el timer:", err);
            }
        }
    };


    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const updateTimer = (endTime) => {
        const end = new Date(endTime).getTime();

        const update = () => {
            const remaining = Math.floor((end - Date.now()) / 1000);
            setRemainingTime(remaining > 0 ? remaining : 0);

            if (remaining <= 0) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setShowBreakTime(prev => !prev);
                setDisableChat(false);
                const audio = new Audio(pomodoroSound);
                audio.play();
            }
        };

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(update, 1000);
        update();
    };

    const syncRoom = () => {
        setDisableChat(selectedRoom.pomodoro.isStudyTime);
        setShowBreakTime(!selectedRoom.pomodoro.isStudyTime);
        updateTimer(new Date(selectedRoom.pomodoro.endTime));
    }

    const forwardRoom = async () => {
        dispatch(updatePomodoroThunk({ roomId: selectedRoom.id, isRestart: true }));
        await connectionRef.current.invoke("RestartTimer", selectedRoom.id, false);
    }

    return (
        <Grid2 container justifyContent="center"
            spacing={4} sx={{ height: "100vh" }}>
            <Grid2 size={{ xs: 12, md: 3 }} marginTop={10} sx={{
                maxHeight: "100vh",
                overflowY: "auto",
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                justifyContent: "center",
            }} >
                {connectedUsers?.map(user => (
                    <Tooltip title={user.userName} key={user.id}>
                        <Avatar src={user.logo == 'profileMan' ? profileMan : profileWoman} sx={{ width: 100, height: 100, margin: 1 }} />
                    </Tooltip>
                ))}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 7 }} padding={5} sx={{ height: "100vh" }} >

                <Typography variant="h4" gutterBottom>
                    {selectedRoom ? selectedRoom.name : "Room"}
                </Typography>

                <Typography variant="subtitle1" mb={2}>
                    {remainingTime !== null
                        ? `${formatTime(remainingTime)}`
                        : (user?.id === selectedRoom?.owner.id) ? "Pulsa 'Iniciar Estudio' para empezar" : "Espere a que se inicie el tiempo"}
                </Typography>

                <Paper
                    variant="outlined"
                    sx={{
                        padding: 2,
                        height: 300,
                        overflowY: "auto",
                        mb: 2,
                        textAlign: "left",
                        border: "3px solid",
                        borderColor: theme.palette.primary.light
                    }}
                    ref={containerScrollRef}
                >
                    {messages.map((msg, index) => (
                        <Typography key={index} variant="body1">
                            <strong>{msg.user}{msg.message && ":"}</strong> {msg.message}
                        </Typography>
                    ))}
                </Paper>

                <form onSubmit={sendMessage}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <TextField
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            variant="outlined"
                            disabled={disableChat}
                        />
                        <Button variant="contained" disabled={disableChat} onClick={sendMessage}>
                            Enviar
                        </Button>
                    </Stack>
                </form>

                {user?.id === selectedRoom?.owner.id && (
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {!showButtonBreakTime && (
                            <Button variant="outlined" color="primary" onClick={studyTimer}>
                                Iniciar Estudio
                            </Button>
                        )}
                        {showButtonBreakTime && (
                            <Button variant="outlined" color="secondary" onClick={breakTimer}>
                                Iniciar Descanso
                            </Button>
                        )}
                        <IconButton color="primary"
                            aria-label="pasar hacia delante"
                            size="large"
                            sx={{ border: '1px solid' }} onClick={forwardRoom}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Stack>
                )}
            </Grid2>
        </Grid2>

    );
};
