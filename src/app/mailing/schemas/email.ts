import { FileObject } from '../../object-store/schemas/file-object';

export type Email = {
  from: string;
  to: string;
  subject: string;
  body: string;
  attachments: Array<FileObject>;
};
