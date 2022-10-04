import ChildProcess from 'child_process';
import { Request, Response } from 'express';
import { ProcessMessageTypes } from '../../../config';

export class PollingController {
  queueProcess: ChildProcess.ChildProcess;

  constructor({ queueProcess }: { queueProcess: ChildProcess.ChildProcess }) {
    this.queueProcess = queueProcess;

    this.startPolling = this.startPolling.bind(this);
    this.stopPolling = this.stopPolling.bind(this);
  }

  startPolling(_req: Request, res: Response) {
    this.queueProcess.send({ type: ProcessMessageTypes.START_POLLING });
    return res.json({ ok: 1 });
  }

  stopPolling(_req: Request, res: Response) {
    this.queueProcess.kill('SIGINT');
    return res.json({ ok: 1 });
  }
}
