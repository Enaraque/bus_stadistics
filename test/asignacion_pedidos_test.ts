import {
    beforeAll,
    describe,
    it,
} from "bdd";

import {
    assertEquals,
    assertLess,
} from "asserts";
import datosParaAsignacionPedidos from "../data/reparto.json" with { type: "json" };
import { Camion } from "../src/camion.ts";
import { Envio } from "../src/envio.ts";
import { AsignacionPedidos } from "../src/asignacion_pedidos.ts";
import { DistanciaEntreDestinos } from "../src/asignacion_pedidos.ts";


function parseFechaDDMMYY(dateString: string): Date {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month-1, day+1);
}

function extraerCamionesJson(camiones : number[]): Camion[] {
    return camiones.map((cargaMaxima: number) => new Camion(cargaMaxima));
}

function extraerEnviosJson(envios : {destino: string, carga : string, consumo: string, listaDias: string[]}[]): Envio[] {
    const arrayEnvios : Envio[] = [];
    envios.forEach((value) => {
        const {destino} = value;
        const carga = parseInt(value.carga);
        const consumo = parseInt(value.consumo);
        const listaDias = value.listaDias.map(dateString => parseFechaDDMMYY(dateString));

        const envio = new Envio(destino, carga, consumo, listaDias);

        arrayEnvios.push(envio);
    });

    return arrayEnvios;
};

function extraerDistanciasJson(distancias : {origen: string, destino: string, distancia: string}[]): DistanciaEntreDestinos[] {
    const arrayDistancias : DistanciaEntreDestinos[] = [];
    distancias.forEach(function (value) {
        const {origen, destino} = value;
        const distancia = parseInt(value.distancia);
        const distancia_entre_envios_actual : DistanciaEntreDestinos = {origen, destino, distancia};
        arrayDistancias.push(distancia_entre_envios_actual);
    });

    return arrayDistancias;
}

function extraerDatosAsignacion(): [Camion[], Envio[], DistanciaEntreDestinos[]] {
    const {camiones, envios, distanciaEntreEnvios} = datosParaAsignacionPedidos;
    const camionesExtraidos = extraerCamionesJson(camiones);
    const enviosExtraidos = extraerEnviosJson(envios);
    const distanciasExtraidas = extraerDistanciasJson(distanciaEntreEnvios);

    return [camionesExtraidos, enviosExtraidos, distanciasExtraidas];
}

function dosEnviosEstanConectados(envio1: Envio, envio2: Envio, distancias: DistanciaEntreDestinos[]): boolean {
    return distancias.some((distancia) => 
        (distancia.origen === envio1.destino && distancia.destino === envio2.destino) ||
        (distancia.origen === envio2.destino && distancia.destino === envio1.destino)
    );
  }

function estanTodosConectadosEnCamion(envios: Envio[], distancias: DistanciaEntreDestinos[]): boolean {
    for (let i = 0; i < envios.length - 1; i++) {
        let encontrado = false;
        for (let j = i + 1; j < envios.length; j++) {
            if (dosEnviosEstanConectados(envios[i], envios[j], distancias)) {
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            return false;
        }
    }
    return true;
}

function comprobarConectividadDeTodosLosEnviosYCamiones(camionesEnviosAsignados: [Camion, Envio[], number][], distancias: DistanciaEntreDestinos[]): boolean {
    for (const camionEnvioAsignado of camionesEnviosAsignados) {
        if (!estanTodosConectadosEnCamion(camionEnvioAsignado[1], distancias)) {
            return false;
        }
    }

    return true;
}

function calcularCoeficienteVariacion(cargasTotalesCamiones: number[]): number {
    const media: number = cargasTotalesCamiones.reduce((sum, val) => sum + val, 0) / cargasTotalesCamiones.length;

    const desviacionEstandar: number = Math.sqrt(cargasTotalesCamiones.reduce((sum, val) => sum + Math.pow(val - media, 2), 0)
                                                / cargasTotalesCamiones.length
                                                );
  
    const coeficienteVariacion: number = (desviacionEstandar / media) * 100;
  
    return coeficienteVariacion;
}

function logicaDePrueba(camionesEnviosAsignados: AsignacionPedidos): [Camion, Envio[], number][] {
    const listaCamionesEnviosAsignados: [Camion, Envio[], number][] = [];
    let listaEnvios = camionesEnviosAsignados.envios;

    camionesEnviosAsignados.camiones.forEach((camion) => {
        listaCamionesEnviosAsignados.push([camion, [], 0]);
    });

    listaCamionesEnviosAsignados.forEach((camionEnvioAsignado) => {
        listaEnvios.forEach((envio) => {
            if (camionEnvioAsignado[0].cargaMaxima >= (envio.carga+camionEnvioAsignado[2])) {
                camionEnvioAsignado[1].push(envio);
                camionEnvioAsignado[2] += envio.carga;
                listaEnvios.shift();
            }
        });
    });

    return listaCamionesEnviosAsignados;
}

describe("Agrupación y ordenación de pedidos", () => {
    let camiones: Camion[];
    let envios: Envio[];
    let distancias: DistanciaEntreDestinos[];
    let asignacionPedidos: AsignacionPedidos;
    beforeAll(() => {
        [camiones, envios, distancias] = extraerDatosAsignacion();
        asignacionPedidos = new AsignacionPedidos(camiones, envios, distancias);
    });


    it("Los pedidos se ordenan por fecha y consumo", () => {

        asignacionPedidos.ordenarEnviosPorFecha();
        assertEquals(envios[0].destino, "Destino A");
        assertEquals(envios[1].destino, "Destino E");
        assertEquals(envios[2].destino, "Destino F");
        assertEquals(envios[3].destino, "Destino B");
    });


    it ("Los pedidos se agrupan por fecha", () => {
        const enviosAgrupados = asignacionPedidos.agruparEnviosPorDia();
        assertEquals(enviosAgrupados["2023-02-05"][0].destino, "Destino A");
        assertEquals(enviosAgrupados["2023-02-05"][1].destino, "Destino E");
        assertEquals(enviosAgrupados["2023-02-05"][2].destino, "Destino F");

        assertEquals(enviosAgrupados["2023-02-06"][0].destino, "Destino C");

        assertEquals(enviosAgrupados["2023-02-08"][0].destino, "Destino D");
    });
});

describe("Lógica de negocio", () => {
    let camiones: Camion[];
    let envios: Envio[];
    let distancias: DistanciaEntreDestinos[];
    let asignacionPedidos: AsignacionPedidos;
    let camionesEnviosAsignadosOptimos : [Camion, Envio[], number][];
    let camionesEnviosAsignadosNoOptimos : [Camion, Envio[], number][];

    beforeAll(() => {
        [camiones, envios, distancias] = extraerDatosAsignacion();
        asignacionPedidos = new AsignacionPedidos(camiones, envios, distancias);
        camionesEnviosAsignadosOptimos = asignacionPedidos.obtenerAsignacion();
        camionesEnviosAsignadosNoOptimos = logicaDePrueba(asignacionPedidos);
    });

    describe("Asignación de pedidos a camiones", () => {
        it ("Los pedidos asignados a un camión no superan su carga máxima", () => {
            const camionesEnviosAsignadosTest: [Camion, Envio[], number][] = [
                [new Camion(1000), [], 0],
            ];
            const envio = new Envio("Destino A", 1500, 10, [new Date("2023-02-05")]);
        
            const resultado = asignacionPedidos.cargarEnvio(envio,camionesEnviosAsignadosTest);
        
            assertEquals(resultado, false);
            assertEquals(camionesEnviosAsignadosTest[0][1].length, 0);
            assertEquals(camionesEnviosAsignadosTest[0][2], 0);
        });
    
        it ("Los pedidos que están en un mismo camión están conectados", () => {
            const camionesEnviosAsignadosTest: [Camion, Envio[], number][] = [
                [new Camion(10000), [], 0],
                [new Camion(5000), [], 0],
            ];
            const envio1 = new Envio("Destino A", 5000, 10, [new Date("2023-02-05")]);
            const envio2 = new Envio("Destino B", 5000, 10, [new Date("2023-02-05")]);
            const envio3 = new Envio("Destino C", 1000, 10, [new Date("2023-02-05")]);
            
            // Las distancias entre los destinos se encuentran en el JSON
            const resultado1 = asignacionPedidos.cargarEnvio(envio1, camionesEnviosAsignadosTest);
            const resultado2 = asignacionPedidos.cargarEnvio(envio2, camionesEnviosAsignadosTest);
            const resultado3 = asignacionPedidos.cargarEnvio(envio3, camionesEnviosAsignadosTest);
        
            assertEquals(resultado1, true);
            assertEquals(resultado2, true);
            assertEquals(resultado3, true);
            assertEquals(camionesEnviosAsignadosTest[0][1].length, 2);
            assertEquals(camionesEnviosAsignadosTest[0][2], 6000);
            assertEquals(camionesEnviosAsignadosTest[1][1].length, 1);
            assertEquals(camionesEnviosAsignadosTest[1][2], 5000);
        });
    
        it ("Un pedido solo se encuentra en un camión", () => {
            const enviosAsignados = camionesEnviosAsignadosOptimos.flatMap((camionEnviosAsignados) => {
                return camionEnviosAsignados[1];
            });
            const enviosUnicos = enviosAsignados.filter((envio, index, array) =>
                array.findIndex((e) => e.destino === envio.destino) === index
            );
    
            assertEquals(enviosAsignados.length, enviosUnicos.length);
        });
    });

    it ("La lógica de negocio es óptima", () => {
        let puntuacionNoOptima = 0;
        let puntuacionOptima = 0;

        const hayEnviosConectadosNoOptimo = comprobarConectividadDeTodosLosEnviosYCamiones(
            camionesEnviosAsignadosNoOptimos,
            distancias
        );
        const hayEnviosConectadosOptimos = comprobarConectividadDeTodosLosEnviosYCamiones(
            camionesEnviosAsignadosOptimos,
            distancias
        );
        
        const coeficienteNoOptimo = calcularCoeficienteVariacion(camionesEnviosAsignadosNoOptimos.map((camionEnviosAsignados) => camionEnviosAsignados[2]));
        const coeficienteOptimo = calcularCoeficienteVariacion(camionesEnviosAsignadosOptimos.map((camionEnviosAsignados) => camionEnviosAsignados[2]));

        if (hayEnviosConectadosNoOptimo) {
            puntuacionNoOptima+= 5;
        }
        if (hayEnviosConectadosOptimos) {
            puntuacionOptima+= 5;
        }

        if(coeficienteNoOptimo < coeficienteOptimo) {
            puntuacionNoOptima+= 2;
        }
        else if (coeficienteNoOptimo > coeficienteOptimo) {
            puntuacionOptima+= 2;
        }
        else {
            puntuacionNoOptima+= 1;
            puntuacionOptima+= 1;
        }

        assertLess(puntuacionNoOptima, puntuacionOptima);
    });
});