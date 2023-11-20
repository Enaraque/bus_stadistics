import {
    afterEach,
    beforeEach,
    beforeAll,
    describe,
    it,
} from "bdd";

import {
    assertEquals,
    assertNotEquals,
} from "asserts";

import { Camion } from "../src/camion.ts";
import { Envio } from "../src/envio.ts";
import { AsignacionPedidos } from "../src/asignacionpedidos.ts";
import { DistanciaEntreDestinos } from "../src/asignacionpedidos.ts";

describe("Leer datos de JSON", () => {
    let asignacionPedidos: AsignacionPedidos;

    beforeEach(() => {
        asignacionPedidos = new AsignacionPedidos();
    });
    it("Extraer camiones", () => {
        const {camiones} = asignacionPedidos;
        const camionesEsperados : Camion[] = [
            new Camion(5000),
            new Camion(10200),
            new Camion(8000),
        ];
            
        assertEquals(camiones, camionesEsperados);
    });

    it("Extraer distancias", () => {
        const {distancias} = asignacionPedidos;
        const distanciasEsperadas : DistanciaEntreDestinos[] = [
            { origen: "Destino A", destino: "Destino C", distancia: 1000 },
            { origen: "Destino A", destino: "Destino E", distancia: 2000 },
            { origen: "Destino B", destino: "Destino D", distancia: 3000 },
            { origen: "Destino B", destino: "Destino E", distancia: 4000 },
            { origen: "Destino D", destino: "Destino F", distancia: 5000 },
            { origen: "Destino C", destino: "Destino D", distancia: 6000 }
        ];
            
        assertEquals(distancias, distanciasEsperadas);
    });
    it("Datos de JSON de camion son instancias de Camion", () => {
        const {camiones} = asignacionPedidos;
        camiones.forEach((camion) => {
            assertEquals(camion instanceof Camion, true)
        });
    });

    it("Datos de JSON de envios son instancias de Envio", () => {
        const {envios} = asignacionPedidos;
        envios.forEach((envio) => {
            assertEquals(envio instanceof Envio, true)
        });
    });
});

describe("Agrupación y ordenación de pedidos", () => {
    it("Los pedidos se ordenan por fecha y consumo", () => {
        const asignacionPedidos = new AsignacionPedidos();
        const {envios} = asignacionPedidos;
        asignacionPedidos.ordenarEnviosPorFecha();
        assertEquals(envios[0].destino, "Destino A");
        assertEquals(envios[1].destino, "Destino E");
        assertEquals(envios[2].destino, "Destino F");
        assertEquals(envios[3].destino, "Destino B");
    });


    it ("Los pedidos se agrupan por fecha", () => {
        const asignacionPedidos = new AsignacionPedidos();
        const {envios} = asignacionPedidos;
        const enviosAgrupados = asignacionPedidos.agruparEnviosPorDia();
        assertEquals(enviosAgrupados["2023-02-05"][0].destino, "Destino A");
        assertEquals(enviosAgrupados["2023-02-05"][1].destino, "Destino E");
        assertEquals(enviosAgrupados["2023-02-05"][2].destino, "Destino F");

        assertEquals(enviosAgrupados["2023-02-06"][0].destino, "Destino C");

        assertEquals(enviosAgrupados["2023-02-08"][0].destino, "Destino D");
    });
});

describe("Asignación de pedidos a camiones", () => {
    let asignacionPedidos : AsignacionPedidos;
    let camionesEnviosAsignados : [Camion, Envio[], number][];

    beforeAll(() => {
        asignacionPedidos = new AsignacionPedidos();
        camionesEnviosAsignados = asignacionPedidos.obtenerAsignacion();
    });

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
        const enviosAsignados = camionesEnviosAsignados.flatMap((camionEnviosAsignados) => {
            return camionEnviosAsignados[1];
        });
        const enviosUnicos = enviosAsignados.filter((envio, index, array) =>
            array.findIndex((e) => e.destino === envio.destino) === index
        );

        assertEquals(enviosAsignados.length, enviosUnicos.length);
    });
});