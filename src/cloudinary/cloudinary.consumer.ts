import { Process, Processor } from '@nestjs/bull';
import {
  CLOUDINARY,
  UPLOAD_IMAGE,
} from '../utils/constants/cloudinary.constant';
import { CloudinaryService } from './cloudinary.service';
import { Job } from 'bull';

@Processor(CLOUDINARY)
export class CloudinaryConsumer {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Process(UPLOAD_IMAGE)
  async uploadImageQueue(job: Job<{ file: Express.Multer.File }>) {
    const { file } = job.data;
    await this.cloudinaryService.uploadImage(file);
  }

  @Process(UPLOAD_IMAGE)
  async uploadImagesQueue(job: Job<{ files: Express.Multer.File[] }>) {
    const { files } = job.data;
    await this.cloudinaryService.uploadImages(files);
  }
}
