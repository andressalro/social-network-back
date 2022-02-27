import express from "express";
const server = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = "0.0.0.0";

server.listen = server.listen.bind(server, PORT, HOSTNAME, () =>
    console.log(`Server listening on ${PORT}`)
);

export { server };