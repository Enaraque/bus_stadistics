import { Camion } from "./Camion";
import { Envio } from "./Envio";

class AsignacionPedidos{

    camiones: Array<Camion>;
    envios: Array<Envio>;
    distanciaEntreEnvios: Array<Array<number>>;

    constructor(camiones: Array<Camion>, envios: Array<Envio>, distanciaEntreEnvios: Array<Array<number>>){
        this.camiones = camiones;
        this.envios = envios;
        this.distanciaEntreEnvios = distanciaEntreEnvios;
    }
}