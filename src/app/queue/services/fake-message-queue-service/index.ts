import { Message } from '../../schemas/message';
import { MessageQueueEmail } from '../../schemas/message-queue-email';
import { MessageQueue } from '../message-queue-service';

export class FakeMessageQueue implements MessageQueue {
  isPollingEnabled: Boolean = false;

  constructor() {
    this.isPollingEnabled = false;
  }

  startPolling(callback: Function): void {
    if (this.isPollingEnabled) {
      process.send?.('>> Refusing to start polling. Process already started.');
      return;
    }

    process.send?.('>> STARTING QUEUE...');
    this.isPollingEnabled = true;
    setInterval(() => {
      const messages: Array<Message> = [];
      for (let i = 0; i < 1; i++) {
        messages.push({
          id: String(parseInt(String(Math.random() * 9999), 10)),
          content: {
            from: 'sender@test.com',
            to: 'receiver1@test.com',
            subject: 'Hello there',
            body: 'Cool new stuff for you!',
            attachmentURLs: ['https://attachment-01', 'https://attachment-02'],
          } as MessageQueueEmail,
        });
      }

      callback(messages);
    }, 5000);
  }
}
