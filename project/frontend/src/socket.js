import { io } from "socket.io-client";

// Initialize the Socket.IO client
const socket = io("http://localhost:5000"); // Replace with your backend URL if different

export default socket;