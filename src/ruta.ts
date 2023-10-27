import { Envio } from "./envio";
import { DistanciaEntreDestinos} from "./asignacionpedidos";

class Ruta {

    envios: Envio[];
    distancias: DistanciaEntreDestinos[];

    constructor(envios: Envio[], distancias: DistanciaEntreDestinos[]) {
        this.envios = envios;
        this.distancias = distancias;
    }

}