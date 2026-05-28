export interface IUsuarioPayload {
  id: number;
  usuario: string;
  perfil: number;
}

export interface ILoginResponse {
  access_token: string;
  user: {
    id: number;
    nome: string;
    usuario: string;
    perfil: number;
  };
}
