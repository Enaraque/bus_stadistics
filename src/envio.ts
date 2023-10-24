export class Envio {

    destino: string;
    carga: number;
    consumo: number;
    listaDias: Array<Date>;

    constructor(destino: string, carga: number, consumo: number, listaDias: Array<Date>) {
        this.destino = destino;
        this.carga = carga;
        this.consumo = consumo;
        this.listaDias = listaDias;
    }
}