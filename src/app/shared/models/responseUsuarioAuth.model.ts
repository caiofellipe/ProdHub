import { AuthorityModel } from "./authority.model";
import { UsuarioModel } from "./usuario.model";

export interface ResponseUsuarioAuthModel{
    token: string;
    usuario: UsuarioModel;
}