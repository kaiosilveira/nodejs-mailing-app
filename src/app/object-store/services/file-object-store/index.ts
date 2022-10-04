import { FileObject } from '../../schemas/file-object';

export interface FileObjectStore {
  fetchObject(key: string): Promise<FileObject>;
}
