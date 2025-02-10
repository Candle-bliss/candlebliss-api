import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'lucasaleh@yopmail.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345a@A', type: String })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Lucas' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Aleh' })
  @IsNotEmpty()
  lastName: string;
}
