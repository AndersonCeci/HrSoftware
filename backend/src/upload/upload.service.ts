import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebaseUpload.service';

@Injectable()
export class UploadService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
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

  async deleteFile(fileName: string): Promise<void> {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();
    const file = bucket.file(fileName);

    return new Promise((resolve, reject) => {
      file.delete((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async getAllFiles(): Promise<string[]> {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();

    const [files] = await bucket.getFiles();

    const fileUrls = files.map((file) => {
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });

    return fileUrls;
  }
}
