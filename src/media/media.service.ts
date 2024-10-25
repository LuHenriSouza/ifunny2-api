import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class MediaService {
    private s3: AWS.S3;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new AWS.S3({
            endpoint: this.configService.get<string>('DO_SPACES_ENDPOINT'),
            accessKeyId: this.configService.get<string>('DO_SPACES_KEY'),
            secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET'),
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const params = {
            Bucket: process.env.DO_SPACES_BUCKET,
            Key: `uploads/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ACL: 'public-read',
        };

        try {
            const data = await this.s3.upload(params).promise();
            return data;
        } catch (error) {
            throw new Error(`File upload error: ${error.message}`);
        }
    }
}
