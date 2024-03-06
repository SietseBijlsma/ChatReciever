const oAuth = "h86fidgbumlm2zqe5mkd987iqq9m6e";
const nick = "SietseBijlsma";
const channel = "caedrel";

const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

socket.addEventListener('open', () => {
    socket.send(`PASS oAuth:${oAuth}`);
    socket.send(`NICK ${nick}`);
    socket.send(`JOIN #${channel}`);
});

socket.addEventListener('message', event => {
    console.log("Twitch Message:" + event.data);
});