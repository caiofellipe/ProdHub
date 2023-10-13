
export function formataStringEmDinheiroPtBR(valor: Number){
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
}
