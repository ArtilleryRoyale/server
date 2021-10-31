import { FloatPack } from "./FloatPack";
import { Snapshot } from "./Snapshot";

export interface Message {
    g: string, // GameId
    u: string, // UserId
    s: number, // Sequence
    n: [Snapshot], // Snapshots
    p: [FloatPack] // FloatPacks
}