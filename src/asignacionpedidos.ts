import { Camion } from "./camion.ts";
import { Envio } from "./envio.ts";
import json from "../data/reparto.json" with { type: "json" };


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
        this.camiones = this.extraerCamionesJson(camiones);
        this.envios = this.extraerEnviosJson(envios);
        this.distancias = this.extraerDistanciasJson(distanciaEntreEnvios);
    }

    private parseFechaDDMMYY(dateString: string): Date {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month-1, day+1);
    }

    private extraerCamionesJson(camiones : number[]): Camion[] {
        return camiones.map((cargaMaxima: number) => new Camion(cargaMaxima));
    }

    private extraerEnviosJson(envios : {destino: string, carga : string, consumo: string, listaDias: string[]}[]): Envio[] {
        const arrayEnvios : Envio[] = [];
        envios.forEach((value) => {
            const {destino} = value;
            const carga = parseInt(value.carga);
            const consumo = parseInt(value.consumo);
            const listaDias = value.listaDias.map(dateString => this.parseFechaDDMMYY(dateString));

            const envio = new Envio(destino, carga, consumo, listaDias);

            arrayEnvios.push(envio);
        });

        return arrayEnvios;
    };

    private extraerDistanciasJson(distancias : {origen: string, destino: string, distancia: string}[]): DistanciaEntreDestinos[] {
        const arrayDistancias : DistanciaEntreDestinos[] = [];
        distancias.forEach(function (value) {
            const {origen, destino} = value;
            const distancia = parseInt(value.distancia);
            const distancia_entre_envios_actual : DistanciaEntreDestinos = {origen, destino, distancia};
            arrayDistancias.push(distancia_entre_envios_actual);
        });

        return arrayDistancias;
    }

    private compararPorFecha(a: Envio, b: Envio): number {
        const fechaA = a.listaDias[0].getTime();
        const fechaB = b.listaDias[0].getTime();
        
        if (fechaA === fechaB) {
            const consumoA = a.consumo;
            const consumoB = b.consumo;

            return consumoA - consumoB;
        }
        return fechaA - fechaB;
    }

    ordenarEnviosPorFecha(): void {
        this.envios.forEach((envio) => {
            envio.listaDias.sort((a, b) => a.getTime() - b.getTime());
        });
        this.envios.sort(this.compararPorFecha);
    }

    agruparEnviosPorDia(): { [key: string]: Envio[] } {
        this.ordenarEnviosPorFecha();
        const enviosAgrupados: { [key: string]: Envio[] } = {};
      
        this.envios.forEach(envio => {
            const fechaString = envio.listaDias[0].toISOString().split('T')[0];
            if (!enviosAgrupados[fechaString]) {
                    enviosAgrupados[fechaString] = [];
            }    
            enviosAgrupados[fechaString].push(envio);
        });
      
        return enviosAgrupados;
    }

    comprobarConectividad(listaEnvios: Envio[], envio: Envio): boolean {
        for (const envioActual of listaEnvios) {
            const destinoEnvioAInsertar = envio.destino;
            const destinoEnvioActual = envioActual.destino;
            const conectividad = this.distancias.find((distanciaEntreEnvios) => {
                return (distanciaEntreEnvios.origen === destinoEnvioAInsertar && distanciaEntreEnvios.destino === destinoEnvioActual) ||
                       (distanciaEntreEnvios.origen === destinoEnvioActual && distanciaEntreEnvios.destino === destinoEnvioAInsertar);
            });
    
            if (conectividad) {
                return true;
            }
        }
    
        return false;
    }

    cargarEnvio(envio: Envio, listaCamionesEnviosAsignados: [Camion, Envio[], number][]): boolean {
        for (const lista of listaCamionesEnviosAsignados) {
            if (lista[2] === 0 && lista[0].cargaMaxima >= envio.carga) {
                lista[1].push(envio);
                lista[2] += envio.carga;
                
                return true;
            }
            else if (lista[0].cargaMaxima >= (envio.carga + lista[2]) && this.comprobarConectividad(lista[1], envio)) {
                lista[1].push(envio);
                lista[2] += envio.carga;
    
                return true;
            }
        }
    
        return false;
    }
    repartirEnviosACamiones(listaCamionesEnviosAsignados: [Camion, Envio[], number][],
                               listaEnviosDiarios: Envio[],
                               enviosSinCamion: Envio[]): boolean {       
        while (listaEnviosDiarios.length > 0) {
            if (this.cargarEnvio(listaEnviosDiarios[0], listaCamionesEnviosAsignados)) {
                listaEnviosDiarios.shift();
            }
            else {
                enviosSinCamion.push(listaEnviosDiarios.shift()!);
            }
        }

        if (enviosSinCamion.length > 0) {
            let enviosRecorridos = 0;
            const tamInicialEnviosSinCamion = enviosSinCamion.length;
            while (enviosRecorridos < tamInicialEnviosSinCamion) {
                const envioSinCamion = enviosSinCamion.shift();
                if (!this.cargarEnvio(envioSinCamion!, listaCamionesEnviosAsignados)) {
                    enviosSinCamion.push(envioSinCamion!);
                }
                enviosRecorridos++;
            }
        }

        return true;

    }
    obtenerAsignacion(): [Camion, Envio[], number][] {
        const listaEnviosPorDias = this.agruparEnviosPorDia();
        const listaCamionesEnviosAsignados: [Camion, Envio[], number][] = [];
        const enviosSinCamion: Envio[] = [];

        this.camiones.forEach((camion) => {
            listaCamionesEnviosAsignados.push([camion, [], 0]);
        });

        for (const listaEnviosDiarios of Object.values(listaEnviosPorDias)) {
            this.repartirEnviosACamiones(listaCamionesEnviosAsignados, listaEnviosDiarios, enviosSinCamion);
        }

        return listaCamionesEnviosAsignados;
    }
}