import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateActorDto {
  @IsOptional()
  @IsUUID() // Or IsUUID() if you're using UUIDs
  id?: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
