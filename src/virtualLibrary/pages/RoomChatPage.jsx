import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const RoomChatPage = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("Usuario" + Math.floor(Math.random() * 1000));
    const [message, setMessage] = useState("");

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7013/roomChatHub")
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                console.log("Conectado a SignalR");
            })
            .catch(err => console.error("Error al conectar con SignalR:", err));

        newConnection.on("ReceiveMessage", (user, message) => {
            setMessages(prevMessages => [...prevMessages, { user, message }]);
        });

        setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, []);

    const sendMessage = async () => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", user, message);
                setMessage("");
            } catch (err) {
                console.error("Error enviando mensaje:", err);
            }
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2>Chat en Vivo</h2>
            <div style={{ border: "1px solid gray", padding: "10px", height: "300px", overflowY: "auto" }}>
                {messages.map((msg, index) => (
                    <div key={index}><strong>{msg.user}:</strong> {msg.message}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                placeholder="Escribe un mensaje..." 
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

