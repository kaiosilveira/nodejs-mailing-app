import http from 'http';
import ChildProcess from 'child_process';
import Path from 'path';
import ExpressApp from './http/express';

const PORT = process.env.PORT || 3000;
const queueProcess = ChildProcess.fork(Path.resolve(__dirname, 'app/queue'));
const app = ExpressApp.createInstance({ queueProcess });

queueProcess.on('message', message => console.log(message));

http.createServer(app).listen(PORT, () => console.log(`Express server started at ${PORT} 🚀`));
