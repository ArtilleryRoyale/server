import { WebSocket } from 'uWebSockets.js';

export interface Player {
    userId: string;
    webSocket: WebSocket;
}
