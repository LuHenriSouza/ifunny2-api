import { IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class CreatePostDto {
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty() // Garante que o array não está vazio, se for fornecido
    tags?: string[]; // Tags relacionadas ao post

    @IsNotEmpty()
    @IsUUID()
    userId: string; // ID do usuário que criou o post
}
