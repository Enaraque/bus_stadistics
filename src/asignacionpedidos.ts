import { Camion } from "./camion";
import { Envio } from "./envio";

export type DistanciaEntreDestinos = { 
    origen: string;
    destino: string;
    distancia: number;
}

class AsignacionPedidos{

    camiones: Camion[];
    envios: Envio[];
    distancias: DistanciaEntreDestinos[];

    constructor(camiones: Camion[], envios: Envio[], distancias: DistanciaEntreDestinos[]){
        this.camiones = camiones;
        this.envios = envios;
        this.distancias = distancias;
    }
}