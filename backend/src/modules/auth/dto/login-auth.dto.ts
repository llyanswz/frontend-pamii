import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
