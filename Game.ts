import { Player } from "./Player";

export interface Game {
    gameId: string;
    owner: Player;
    guest: Player | null;
}
