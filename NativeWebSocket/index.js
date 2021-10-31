const express = require('express');
const path = require('path');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();

const server = createServer(app);
const wss = new WebSocket.Server({ server });

let toReplay = null;

wss.on('connection', function(ws) {
  console.log("client joined.");

  if (toReplay != null) {
    console.log("to replay is not null, sending message");
    if (ws.readyState === WebSocket.OPEN) console.log("open");
    else console.log("not open" + ws.readyState);
    ws.send(toReplay);
    toReplay = null;
  }

  // send "hello world" every 1 second.
  //var id = setInterval(() => ws.send("hello world!"), 1000);

  ws.on('message', function(data) {
    console.log("client sent a message:", data);
    toReplay = data;
  });

  ws.on('close', function() {
    console.log("client left.");
    //clearInterval(id);
  });
});

server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});
