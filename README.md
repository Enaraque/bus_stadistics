# fuel_data

## Descripción del problema

Soy un empresario con una flota de camiones y el gasto operacional principal es el del combustible. Cada semana tengo que enviar varios pedidos con una carga determinada y una fecha máxima de entrega cada uno de ellos. Mi problema principal es que a la hora de asignarle una ruta a cada camión para poder entregar varios pedidos en un mismo viaje no sé cual seria la ruta más óptima a seguir entre ellos para que el coste del combustible sea el menor posible teniendo en cuenta que cada pedido tiene una fecha limite de entrega.

## Clase Ruta

La clase ruta representa a la entidad principal del proyecto. En esta clase se
encuentra la lógica de negocio principal, esta es, calcular la ruta más óptima.

### Comprobación de sintaxis

Para poder comprobar que la sintaxis es correcta en nuestra entidad, así como en
las diferentes clases de nuestro proyecto, se utiliza el siguiente comando:

```bash
deno task check
```

### Ejecución de tests

Para poder ejecutar los tests hay que ejecutar el siguiente comando:

```bash
deno task test
```

### Construcción y ejecución de la imagen Docker

- Para poder construir la imagen Docker hay que ejecutar el siguiente comando:

```bash
docker build -t enaraque/bus_stadistics .
```
> __Nota__: También podemos obtener la imagen desde [DockerHub](https://hub.docker.com/r/enaraque/bus_stadistics)

- Para poder ejecutar la imagen Docker hay que ejecutar el siguiente comando:

```bash
docker run -tv `pwd`:/app/test enaraque/bus_stadistics
```

## Configuración de git y gitHub

La configuración se puede ver [aqui](/doc/configuracion_gitHub.md)

## Estructura y planificación del proyecto

- [Historias de Usuario](/doc/historias_usuario.md)
- [Milestones](/doc/milestones.md)
- [User Journey](/doc/user_journey.md)
- [Runtime](/doc/runtime.md)
- [Gestor de dependencias](/doc/gestor_dependencias.md)
- [Gestor de tareas](/doc/gestor_tareas.md)
- [Herramientas para los tests](/doc/eleccion_herramientas_test.md)
- [Imagen de Docker](/doc/imagen_docker.md)
