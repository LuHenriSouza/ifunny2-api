import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MediaService {
    private s3Client: S3Client;
    private readonly mainFolder = 'uploads';
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
        const bucketName = this.configService.get<string>('DO_SPACES_BUCKET');
        const key = `${this.mainFolder}/${Date.now()}-${file.originalname}`;

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

    async deleteFile(link: string): Promise<string> {
        const bucketName = this.configService.get<string>('DO_SPACES_BUCKET');
        const key = link.split(`${bucketName}/`)[1];
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        
        try {
            await this.s3Client.send(command);
            return 'File deleted';
        } catch (error) {
            return error.message;
        }
    }
}
