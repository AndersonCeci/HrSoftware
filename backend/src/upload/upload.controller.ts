import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.fileService.uploadFile(file);
    return { fileUrl };
  }

  @Delete('delete/:fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    await this.fileService.deleteFile(fileName);
    return { message: 'File deleted successfully' };
  }

  @Get('list')
  async listFiles() {
    const fileUrls = await this.fileService.getAllFiles();
    return { files: fileUrls };
  }
}
