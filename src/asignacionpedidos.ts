import { Camion } from "./camion.ts";
import { Envio } from "./envio.ts";
import json from "./data/reparto.json" with { type: "json" };


export type DistanciaEntreDestinos = { 
    origen: string;
    destino: string;
    distancia: number;
}

export class AsignacionPedidos{

    camiones: Camion[];
    envios: Envio[];
    distancias: DistanciaEntreDestinos[];

    constructor() {
        const {camiones, envios, distanciaEntreEnvios} = json;
        this.camiones = this.extraer_camiones_json(camiones);
        this.envios = this.extraer_envios_json(envios);
        this.distancias = this.extraer_distancias_json(distanciaEntreEnvios);
    }

    private parseFechaDDMMYY(dateString: string): Date {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month-1, day+1);
    }

    extraer_camiones_json(camiones : number[]): Camion[] {
        return camiones.map((cargaMaxima: number) => new Camion(cargaMaxima));
    }

    extraer_envios_json(envios : {destino: string, carga : string, consumo: string, listaDias: string[]}[]): Envio[] {
        const array_envios : Envio[] = [];
        envios.forEach((value) => {
            const {destino} = value;
            const carga = parseInt(value.carga);
            const consumo = parseInt(value.consumo);
            const listaDias = value.listaDias.map(dateString => this.parseFechaDDMMYY(dateString));

            const envio = new Envio(destino, carga, consumo, listaDias);

            array_envios.push(envio);
        });

        return array_envios;
    };

    extraer_distancias_json(distancias : {origen: string, destino: string, distancia: string}[]): DistanciaEntreDestinos[] {
        const array_distancias : DistanciaEntreDestinos[] = [];
        distancias.forEach(function (value) {
            const {origen, destino} = value;
            const distancia = parseInt(value.distancia);
            const distancia_entre_envios_actual : DistanciaEntreDestinos = {origen, destino, distancia};
            array_distancias.push(distancia_entre_envios_actual);
        });

        return array_distancias;
    }

    comparar_por_fecha(a: Envio, b: Envio): number {
        const fechaA = a.listaDias[0].getTime();
        const fechaB = b.listaDias[0].getTime();
        
        if (fechaA === fechaB) {
            const consumoA = a.consumo;
            const consumoB = b.consumo;

            return consumoA - consumoB;
        }
        return fechaA - fechaB;
    }

    ordenar_envios_por_fecha(): void {
        this.envios.forEach((envio) => {
            envio.listaDias.sort((a, b) => a.getTime() - b.getTime());
        });
        this.envios.sort(this.comparar_por_fecha);
    }

    agrupar_envios_por_dia(): { [key: string]: Envio[] } {
        this.ordenar_envios_por_fecha();
        const envios_agrupados: { [key: string]: Envio[] } = {};
      
        this.envios.forEach(envio => {
            const fecha_string = envio.listaDias[0].toISOString().split('T')[0];
            if (!envios_agrupados[fecha_string]) {
                    envios_agrupados[fecha_string] = [];
            }    
            envios_agrupados[fecha_string].push(envio);
        });
      
        return envios_agrupados;
    }

    comprobar_conectividad(lista_envios: Envio[], envio: Envio): boolean {
        for (const envio_actual of lista_envios) {
            const destino_envio_a_insertar = envio.destino;
            const destino_envio_actual = envio_actual.destino;
            const conectividad = this.distancias.find((distancia_entre_envios) => {
                return (distancia_entre_envios.origen === destino_envio_a_insertar && distancia_entre_envios.destino === destino_envio_actual) ||
                       (distancia_entre_envios.origen === destino_envio_actual && distancia_entre_envios.destino === destino_envio_a_insertar);
            });
    
            if (conectividad) {
                return true;
            }
        }
    
        return false;
    }

    cargar_envio(envio: Envio, lista_camiones_envios_asignados: [Camion, Envio[], number][]): boolean {
        for (const lista of lista_camiones_envios_asignados) {
            if (lista[2] === 0 && lista[0].cargaMaxima >= envio.carga) {
                lista[1].push(envio);
                lista[2] += envio.carga;
                
                return true;
            }
            else if (lista[0].cargaMaxima >= (envio.carga + lista[2]) && this.comprobar_conectividad(lista[1], envio)) {
                lista[1].push(envio);
                lista[2] += envio.carga;
    
                return true;
            }
        }
    
        return false;
    }
}