import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MediaService {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            endpoint: this.configService.get<string>('DO_SPACES_ENDPOINT'),
            region: 'nyc3',
            credentials: {
                accessKeyId: this.configService.get<string>('DO_SPACES_KEY'),
                secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET'),
            },
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const endpoint = this.configService.get<string>('DO_SPACES_ENDPOINT');
        const bucketName = process.env.DO_SPACES_BUCKET;
        const key = `uploads/${Date.now()}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ACL: 'public-read',
        });
        
        try {
            await this.s3Client.send(command);
            const url = `${endpoint}/${bucketName}/${key}`;
            return { Location: url };
        } catch (error) {
            throw new Error(`File upload error: ${error.message}`);
        }
    }
}
