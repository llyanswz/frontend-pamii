import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IUsuarioPayload, ILoginResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginAuthDto): Promise<ILoginResponse> {
    const user = await this.usuarioService.login(dto.usuario, dto.senha);

    const payload: IUsuarioPayload = {
      id: user.id,
      usuario: user.usuario,
      perfil: user.perfil,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        perfil: user.perfil,
      },
    };
  }
}
