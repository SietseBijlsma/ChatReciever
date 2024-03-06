const express = require('express');
const path = require('path');
const ws = require('ws');

const youtubeService = require('./youtubeService.js');

const server = express();

server.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/index.html'))
);

server.get('/authorize', (request, response) => {
  console.log('/auth');
  youtubeService.getCode(response);
});

server.get('/callback', (req, response) => {
  const { code } = req.query;
  youtubeService.getTokensWithCode(code);
  response.redirect('/');
});

server.get('/find-active-chat', (req, res) => {
  youtubeService.findActiveChat();
  res.redirect('/');
});

server.get('/start-tracking-chat', (req, res) => {
  youtubeService.startTrackingChat();
  res.redirect('/');
});

server.get('/stop-tracking-chat', (req, res) => {
  youtubeService.stopTrackingChat();
  res.redirect('/');
});

server.get('/insert-message', (req, res) => {
  youtubeService.insertMessage('Hello World');
  res.redirect('/');
});

server.listen(3000, function() {
  console.log('Server is Ready');
});

//twitch listening bot
const oAuth = "h86fidgbumlm2zqe5mkd987iqq9m6e";
const nick = "SietseBijlsma";
const channel = "caedrel";

const socket = new ws.WebSocket("wss://irc-ws.chat.twitch.tv:443");

socket.addEventListener('open', () => {
    socket.send(`PASS oauth:${oAuth}`);
    socket.send(`NICK ${nick}`);
    socket.send(`JOIN #${channel}`);
});

socket.addEventListener('message', event => {
    console.log("Twitch Message:" + event.data);
});