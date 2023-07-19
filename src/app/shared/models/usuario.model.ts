import { EmpresaModel } from './empresa.model';
import { NivelUsuarioModel } from './nivelUsuario.model';
export interface UsuarioModel {
	id?: string;
	nome?: string;
	sobrenome?: string;
	idUsuarioConvite?: string;
    senha?: string;
	email?: string;
	login?: string;
	idUsuario?: string;
	ativo?: Boolean;
    dataCriado?: Date;
	dataAlterado?: Date;
	nivelUsuario?: NivelUsuarioModel;
    foto?: Blob;
    empresaId?: string;
}