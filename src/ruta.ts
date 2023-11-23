import { Envio } from "./envio.ts";
import { DistanciaEntreDestinos } from "./asignacion_pedidos.ts";


class Ruta {

    envios: Envio[];
    distancias: DistanciaEntreDestinos[];

    constructor(envios: Envio[], distancias: DistanciaEntreDestinos[]) {
        this.envios = envios;
        this.distancias = distancias;
    }
}