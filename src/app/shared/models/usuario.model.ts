import { NivelUsuario } from './nivelUsuario.model';
export interface Usuario {
	id: string;
	nome: string;
	sobrenome: string;
	email: string;
	login: string;
	idUsuario: string;
	ativo: Boolean;
    dataCriado: Date;
	dataAlterado: Date;
	nivelUsuario: NivelUsuario;
}