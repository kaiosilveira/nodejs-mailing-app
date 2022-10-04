export type MessageQueueEmail = {
  from: string;
  to: string;
  subject: string;
  body: string;
  attachmentURLs: Array<string>;
};
