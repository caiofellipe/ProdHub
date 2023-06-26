import { NivelUsuarioModel } from './nivelUsuario.model';
export interface UsuarioModel {
	id: string;
	nome: string;
	sobrenome: string;
	email: string;
	login: string;
	idUsuario: string;
	ativo: Boolean;
    dataCriado: Date;
	dataAlterado: Date;
	nivelUsuario: NivelUsuarioModel;
}