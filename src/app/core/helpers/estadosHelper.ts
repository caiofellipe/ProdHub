import { ESTADOS } from "src/app/shared/constants/estados";
import { EstadoModel } from "src/app/shared/models/estado.model";

export function pesquisaEstadoPelaUf(uf: string){
    return ESTADOS.find((es: EstadoModel) => es.uf === uf)?.nome;
}