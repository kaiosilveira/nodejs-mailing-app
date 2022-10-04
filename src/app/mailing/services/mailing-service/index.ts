import { Email } from '../../schemas/email';

export interface MailingService {
  send(message: Email): void;
}
