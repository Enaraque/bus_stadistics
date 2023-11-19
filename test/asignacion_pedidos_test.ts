import {
    afterEach,
    beforeEach,
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