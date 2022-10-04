import { MailingService } from '../mailing/services/mailing-service';
import { FileObjectStore } from '../object-store/services/file-object-store';
import { Message } from './schemas/message';

type QueueMonitorProps = {
  fileObjectStore: FileObjectStore;
  mailingService: MailingService;
};

export class QueueMonitor {
  fileObjStore: FileObjectStore;
  mailingService: MailingService;

  constructor(props: QueueMonitorProps) {
    this.fileObjStore = props.fileObjectStore;
    this.mailingService = props.mailingService;

    this.processMessage = this.processMessage.bind(this);
    this.processMessageBatch = this.processMessageBatch.bind(this);
  }

  async processMessageBatch(messages: Array<Message>) {
    await Promise.all(messages.map(this.processMessage));
  }

  async processMessage(message: Message) {
    const content = message.content;
    const attachments = await Promise.all(
      content.attachmentURLs.map(url => this.fileObjStore.fetchObject(url))
    );

    this.mailingService.send({
      from: content.from,
      to: content.to,
      subject: content.subject,
      body: content.body,
      attachments,
    });
  }
}
