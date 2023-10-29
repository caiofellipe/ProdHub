import { Role } from "src/app/shared/models/role.model";
import { ResponseUsuarioAuthModel } from "src/app/shared/models/responseUsuarioAuth.model";

export function permissaoUsuario(usuarioAuth: ResponseUsuarioAuthModel){
    return usuarioAuth.usuario.roles?.find((role: Role) => role)?.nome;
}