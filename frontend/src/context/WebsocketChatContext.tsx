import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const chatSocket = io('http://localhost:3000');
export const WebsocketChatContext = createContext<Socket>(chatSocket);

export const WebsocketChatProvider = WebsocketChatContext.Provider;