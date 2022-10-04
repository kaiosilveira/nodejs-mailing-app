import { Email } from '../../schemas/email';
import { MailingService } from '../mailing-service';

export class FakeMailingService implements MailingService {
  send(message: Email): void {
    process.send?.(
      `sending ${message.subject} to ${message.to} with ${
        message.attachments.length
      } attachments: [${message.attachments.map(att => `${att.filename} (${att.content.length})`)}]`
    );
  }
}
