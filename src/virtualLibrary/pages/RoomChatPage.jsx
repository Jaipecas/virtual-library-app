import { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { getStudyRoomThunk } from "../../store/thunks/studyRoomThunks";
import { Box } from "@mui/system";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import pomodoroSound from "../../assets/sounds/pomodoroSound.mp3";


export const RoomChatPage = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [showButtonBreakTime, setShowBreakTime] = useState(false);
    const [disableChat, setDisableChat] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const intervalRef = useRef(null);

    const { user } = useSelector(state => state.auth);
    const { selectedRoom } = useSelector(state => state.studyRoom);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        getRoom();
    }, []);

    useEffect(() => {
        if (!selectedRoom) return;

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7013/roomChatHub")
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                sendJoinGroupMessage(selectedRoom.id, newConnection);
            })
            .catch(err => console.error("Error al conectar con SignalR:", err));

        newConnection.on("ReceiveMessage", (user, message) => {
            setMessages(prev => [...prev, { user, message }]);
        });

        //TODO refactorizar
        newConnection.on("TimerStarted", ({ startTime, duration, disableChat }) => {

            setDisableChat(disableChat);
            const start = new Date(startTime).getTime();
            const end = start + (duration * 60 * 1000);

            const update = () => {
                const now = Date.now();
                const diff = Math.floor((end - now) / 1000);
                setRemainingTime(diff);

                if (diff <= 0 && intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setShowBreakTime(prev => !prev);
                    setDisableChat(false);
                    const audio = new Audio(pomodoroSound);
                    audio.play();
                }
            };

            update();

            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(update, 1000);
        });

        setConnection(newConnection);

        return () => {
            newConnection.stop();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [selectedRoom]);

    const getRoom = () => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        dispatch(getStudyRoomThunk(id));
    };

    const sendMessage = async (event) => {
        event.preventDefault();
        if (connection) {
            try {
                await connection.invoke("SendMessage", selectedRoom.id, user.userName, message);
                setMessage("");
            } catch (err) {
                console.error("Error enviando mensaje:", err);
            }
        }
    };

    const sendJoinGroupMessage = async (roomId, connection) => {
        if (connection) {
            try {
                await connection.invoke("JoinGroup", roomId, user.userName);
            } catch (err) {
                console.error("Error uniendo al grupo:", err);
            }
        }
    };

    const studyTimer = async () => {
        if (connection) {
            try {
                await connection.invoke("StartTimer", selectedRoom.id, selectedRoom.pomodoro.pomodoroTime, true);
            } catch (err) {
                console.error("Error iniciando el timer:", err);
            }
        }
    };

    const breakTimer = async () => {
        if (connection) {
            try {
                await connection.invoke("StartTimer", selectedRoom.id, selectedRoom.pomodoro.breakTime, false);
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

    return (
        <Box maxWidth={600} mx="auto" textAlign="center" p={2}>
            <Typography variant="h4" gutterBottom>
                {selectedRoom ? selectedRoom.name : "Room"}
            </Typography>

            <Typography variant="subtitle1" mb={2}>
                {remainingTime !== null
                    ? `${formatTime(remainingTime)}`
                    : "Pulsa 'Iniciar' para empezar"}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    padding: 2,
                    height: 300,
                    overflowY: "auto",
                    mb: 2,
                    textAlign: "left"
                }}
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
                    <Button variant="contained" onClick={sendMessage}>
                        Enviar
                    </Button>
                </Stack>
            </form>

            {user?.id === selectedRoom?.owner.id && (
                <Stack direction="row" spacing={2} justifyContent="center">
                    {!showButtonBreakTime && (
                        <Button variant="outlined" color="primary" onClick={studyTimer}>
                            Iniciar Timer
                        </Button>
                    )}
                    {showButtonBreakTime && (
                        <Button variant="outlined" color="secondary" onClick={breakTimer}>
                            Iniciar Break Timer
                        </Button>
                    )}
                </Stack>
            )}
        </Box>
    );
};
