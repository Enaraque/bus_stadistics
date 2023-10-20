import { Camion } from "./Camion";
import { Envio } from "./Envio";

export declare var maximoEnvios: number;

class AsignacionPedidos{

    camiones: Array<Camion>;
    envios: Array<Envio>;
    distanciaEntreEnvios: number[][];

    constructor(camiones: Array<Camion>, envios: Array<Envio>, distanciaEntreEnvios: number[][]){
        this.camiones = camiones;
        this.envios = envios;
        this.distanciaEntreEnvios = distanciaEntreEnvios;
    }
}