import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from './firebaseUpload.service';
import { FileDocument } from './schema/files.schema';


@Injectable()
export class UploadService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<string[] | string> {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();

    const uploadPromises = files.map(async (file) => {
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      const imageUrl = await new Promise<string>((resolve, reject) => {
        stream.on('error', (error) => {
          reject(error);
        });
        stream.on('finish', async () => {
          try {
            await fileUpload.makePublic(); // Make file public
            const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            resolve(url);
          } catch (error) {
            reject(error);
          }
        });
        stream.end(file.buffer);
      });

      // await this.fileModel.create({ url: imageUrl });

      return imageUrl;
    });

    return Promise.all(uploadPromises);
  }
}
