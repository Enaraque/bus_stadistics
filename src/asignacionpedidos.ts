import { Camion } from "./camion";
import { Envio } from "./envio";

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