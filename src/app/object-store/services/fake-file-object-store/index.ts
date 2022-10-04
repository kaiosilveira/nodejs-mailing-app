import fs from 'fs';
import Path from 'path';
import { FileObject } from '../../schemas/file-object';
import { FileObjectStore } from '../file-object-store';

export class FakeFileObjectStore implements FileObjectStore {
  async fetchObject(key: string): Promise<FileObject> {
    return new Promise((resolve, reject) => {
      fs.readFile(Path.resolve(__dirname, 'attachment.png'), (err, data) => {
        if (err) reject(err);
        resolve({ filename: key, content: data } as FileObject);
      });
    });
  }
}
