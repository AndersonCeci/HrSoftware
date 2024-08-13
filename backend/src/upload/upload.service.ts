import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebaseUpload.service';
import { resolve } from 'path';
import { rejects } from 'assert';
import { Stream } from 'stream';

@Injectable()
export class UploadService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadFile(file ): Promise<string> {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();

    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    console.log(fileName, 'fileNameeee');
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, rejects) => {
      stream.on('error', (error) => {
        rejects(error);
      });
      stream.on('finish', async () => {
        try {
          await fileUpload.publicUrl();
          const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(imageUrl);
        } catch (error) {
          rejects(error);
        }
      });
      stream.end(file.buffer);
    });
  }
}
