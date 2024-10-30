import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class InsertPostDto {
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty() // Garante que o array não está vazio, se for fornecido
    tags?: string[]; // Tags relacionadas ao post

    @IsNotEmpty()
    @IsString()
    media_url: string; // URL do arquivo enviado para o DigitalOcean Spaces

    @IsOptional()
    @IsString()
    thumbnail_url?: string; // URL da miniatura, se aplicável

    @IsNotEmpty()
    @IsUUID()
    userId: string; // ID do usuário que criou o post
}
