import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class CreatePostDto {
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty() // Garante que o array não está vazio, se for fornecido
    tags?: string[]; // Tags relacionadas ao post

    @IsNotEmpty()
    @IsString()
    url: string; // URL do arquivo enviado para o DigitalOcean Spaces

    @IsOptional()
    @IsString()
    thumbnailUrl?: string; // URL da miniatura, se aplicável

    @IsNotEmpty()
    @IsUUID()
    userId: string;
}
