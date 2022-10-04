"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
let messageCount = 0;
const app = (0, express_1.default)();
const queueProcess = child_process_1.default.fork(path_1.default.resolve(__dirname, 'queue'));
queueProcess.on('message', (message) => {
    console.log(message);
    messageCount++;
});
app.put('/start-polling', (_, res) => {
    queueProcess.send({ type: config_1.ProcessMessageTypes.START_POLLING });
    return res.end();
});
app.put('/stop-polling', (_, res) => {
    queueProcess?.kill('SIGINT');
    return res.end();
});
app.get('/message-count', (_, res) => {
    return res.json({ count: messageCount });
});
http_1.default.createServer(app).listen(3000, () => console.log('Express server started at 3000'));
