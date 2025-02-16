import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, example: 'Nen Thom Huong Vai' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'Mo ta' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    example: 'https://www.youtube.com/watch?v=675zElzOFuc',
  })
  @IsString()
  @IsOptional()
  video?: string;

  @ApiProperty({ type: String, example: 'Size M' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ type: String, example: 'Huong hoa nhai' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ type: Number, example: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  quantities?: number;
}
