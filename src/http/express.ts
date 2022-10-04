import express from 'express';
import ChildProcess from 'child_process';
import { PollingController } from './controllers/polling';

class ExpressApp {
  static createInstance({ queueProcess }: { queueProcess: ChildProcess.ChildProcess }) {
    const app = express();
    const pollingCtrl = new PollingController({ queueProcess });

    app.put('/polling/start', pollingCtrl.startPolling);
    app.put('/polling/stop', pollingCtrl.stopPolling);

    return app;
  }
}

export default ExpressApp;
