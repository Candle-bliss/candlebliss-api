import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY } from '../utils/constants/cloudinary.constant';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [
    {
      provide: CLOUDINARY,
      useFactory: (configService: ConfigService) => ({
        cloud_name: configService.get('cloudinary.cloud_name', { infer: true }),
        api_key: configService.get('cloudinary.api_key', { infer: true }),
        api_secret: configService.get('cloudinary.api_secret', { infer: true }),
      }),
      inject: [ConfigService],
    },
    CloudinaryService,
  ],
  imports: [
    BullModule.registerQueue({
      name: CLOUDINARY,
    }),
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
