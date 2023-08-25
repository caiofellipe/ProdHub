import { AuthorityModel } from "./authority.model";
import { UsuarioModel } from "./usuario.model";

export interface ResponseUsuarioAuthModel{
    password: string;
    authorities: AuthorityModel[];
    usuario: UsuarioModel;
    enabled: boolean;
    username: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}