import { FakeMessageQueue } from './services/fake-message-queue-service';
import { QueueMonitor } from './queue-monitor';
import { FakeFileObjectStore } from '../object-store/services/fake-file-object-store';
import { FakeMailingService } from '../mailing/services/fake-mailing-service';
import { ProcessMessage, ProcessMessageTypes } from '../../config';

const queue = new FakeMessageQueue();
const queueMonitor = new QueueMonitor({
  fileObjectStore: new FakeFileObjectStore(),
  mailingService: new FakeMailingService(),
});

process.on('message', (msg: ProcessMessage) => {
  if (msg.type === ProcessMessageTypes.START_POLLING) {
    queue.startPolling(queueMonitor.processMessageBatch);
  }
});

process.on('SIGINT', () => {
  process.send?.('STOPPING QUEUE...');
  process.exit(0);
});
