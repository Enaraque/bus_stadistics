import { Envio } from "./envio.ts";

class Ruta {

    envios: Envio[];
    distancias: number[][];
    
    constructor(envios: Envio[], distancias: number[][]) {
        this.envios = envios;
        this.distancias = distancias;
    }

}