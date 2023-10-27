import { Camion } from "./camion.ts";
import { Envio } from "./envio.ts";


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