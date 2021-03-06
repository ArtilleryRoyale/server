"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/uNetworking/uWebSockets.js/tree/master
const uWebSockets_js_1 = require("uWebSockets.js");
const MethodIdentifier_1 = require("./MethodIdentifier");
const DEBUG = false;
const VERBOSE = false;
const VERSION = 2;
const WebSocketPort = 8080;
const WebSocketServerConnection = /*SSL*/ uWebSockets_js_1.App({
    key_file_name: 'misc/key.pem',
    cert_file_name: 'misc/cert.pem',
    passphrase: '1234'
});
let Games = {};
function Who(isOwner) {
    return isOwner ? "OWNER" : "GUEST";
}
function Log(message) {
    let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];
    console.log("[" + time + "] " + message);
}
function Debug(message) {
    if (!DEBUG)
        return;
    Log(message);
}
function Verbose(message) {
    if (!VERBOSE)
        return;
    Log(message);
}
function ConnectionUpgrade(response, request, context) {
    Debug("An http connection wants to become WebSocket with URL: " + request.getUrl());
    let gameId = request.getParameter(0);
    let userId = request.getParameter(1);
    // This immediately calls `open` handler, you must not use `response` after this call
    response.upgrade({ gameId, userId }, request.getHeader("sec-websocket-key"), request.getHeader("sec-websocket-protocol"), request.getHeader("sec-websocket-extensions"), context);
}
function ConnectionOpen(webSocket) {
    let gameId = webSocket.gameId;
    let userId = webSocket.userId;
    let player = { userId, webSocket };
    // Game does not exist in memory, create a new game
    if (!Games.hasOwnProperty(gameId)) {
        Log("[OWNER]\tNew Game: " + gameId + " from user: " + userId);
        Games[gameId] = { gameId, owner: player, guest: null };
    }
    else {
        Log("[GUEST]\tExisting Game: " + gameId + " user: " + userId + " joined");
        let game = Games[gameId];
        game.guest = player;
        // Send ready to owner
        let ok = game.owner.webSocket.send(player.userId, false);
        if (ok) {
            Log("[GUEST]\tSent confirmation to OWNER");
        }
        else {
            Log("[LOBBY]\tBACK PRESSURE");
        }
    }
}
// The actual logic, basically get the message and forward it the the other webSocket in the game
// 90% of the code is for debug
function ConnectionMessage(webSocket, message, isBinary) {
    let gameId = webSocket.gameId;
    let userId = webSocket.userId;
    if (!Games.hasOwnProperty(gameId)) {
        Log("[ERROR]\tA message has been received but the game " + gameId + " does not exist (over)");
        return;
    }
    let isOwner = Games[gameId].owner.userId == userId;
    let player = { userId, webSocket };
    let otherPlayer = isOwner ? Games[gameId].guest : Games[gameId].owner;
    if (isBinary) {
        Log("[ERROR]\tReceived binary data, unexpected");
        return;
    }
    let string = String.fromCharCode.apply(null, Array.from(new Uint8Array(message)));
    if (string.startsWith("LogMarker:")) {
        Log("[MARKER]\t" + string.replace("LogMarker:", ""));
        return;
    }
    if (DEBUG) {
        try {
            let json = JSON.parse(string);
            Verbose(JSON.stringify(json, null, 4));
            let messageObject = json;
            if (messageObject.n.length > 0) {
                Debug("[" + Who(isOwner) + "]\tSequence " + messageObject.s + " sender: " + messageObject.u);
                for (let snapshot of messageObject.n) {
                    Debug("[" + Who(isOwner) + "]\t\tSnapshot " + MethodIdentifier_1.debugIntToObject(snapshot.o) + "???" + MethodIdentifier_1.debugIntToMethod(snapshot.m) + " ???? " + (snapshot.t < 0 ? "INSTANT??????" : DebugRoundTime(snapshot.t)));
                }
            }
            for (let floatPack of messageObject.p) {
                Debug("[" + Who(isOwner) + "]\t\tFloatPack " + floatPack.o + " @" + floatPack.t);
            }
        }
        catch {
            Debug("[" + Who(isOwner) + "]\tPlayer message received: ???? " + MethodIdentifier_1.debugStringToMessage(string));
        }
    }
    if (otherPlayer == null) {
        Log("[ERROR]\totherPlayer is null");
        return;
    }
    // Ok is false if back pressure was built up, wait for drain
    let ok = otherPlayer.webSocket.send(message, isBinary);
    if (ok) {
        Debug("[" + Who(isOwner) + "]\t\tMessage has been forwarded to: " + otherPlayer.userId);
    }
    else {
        Log("[LOBBY]\tBACK PRESSURE");
    }
}
function ConnectionDrain(webSocket) {
    // TODO check how this should be handled
    Log("[GAME]\tWebSocket BACK PRESSURE: " + webSocket.getBufferedAmount());
}
function ConnectionClose(webSocket, code, message) {
    let gameId = webSocket.gameId;
    let userId = webSocket.userId;
    delete (Games[gameId]);
    Log("[GAME]\tWebSocket closed game: " + gameId + " is over");
}
function HealthCheck() {
    Log("[HEALTH]\t" + Object.keys(Games).length + " game(s)");
}
function main() {
    setInterval(HealthCheck, 30 * 1000);
    WebSocketServerConnection
        .ws("/" + VERSION + "/game/:gameId/:userId", {
        compression: uWebSockets_js_1.SHARED_COMPRESSOR,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 0,
        upgrade: ConnectionUpgrade,
        open: ConnectionOpen,
        message: ConnectionMessage,
        drain: ConnectionDrain,
        close: ConnectionClose,
    })
        .any("/*", (response, request) => {
        response.writeStatus("301 Moved Permanently");
        response.writeHeader("Location", "https://artilleryroyale.com");
        response.end("<a href=\"https://artilleryroyale.com\">Check ArtilleryRoyale.com</a>");
    })
        .listen(WebSocketPort, (token) => {
        if (token) {
            Log("Listening to port " + WebSocketPort);
        }
        else {
            Log("Failed to listen to port " + WebSocketPort);
        }
    });
}
function DebugRoundTime(n) {
    return "" + Math.round((n + 0.00001) * 100) / 100;
}
main();
