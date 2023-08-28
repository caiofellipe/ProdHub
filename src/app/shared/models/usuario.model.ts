import { AuthorityModel } from './authority.model';
import { EmpresaModel } from './empresa.model';
import { NivelUsuarioModel } from './nivelUsuario.model';
import { Role } from './role.model';
export interface UsuarioModel {
	id?: string;
	nome?: string;
	idUsuarioConvite?: Number;
    senha?: string;
	email?: string;
	ativo?: Boolean;
    dataCriado?: Date;
	dataAlterado?: Date;
	roles?: Role[];
	authorities?: AuthorityModel[];
    foto?: Blob;
}