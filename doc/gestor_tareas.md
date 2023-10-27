# Gestor de tareas

En este apartado se nos presenta diversos gestores de tareas que podemos
escoger: Make, Drake y el propio gestor de tareas de Deno, etc.

En mi caso, el criterio de elección principal va a ser la comodidad junto
con el mantenimiento que el gestor tenga.

## Make

Una de las opciones que se nos presenta es **Make**. Este gestor de tareas
es muy potente y permite automatizar tareas de forma sencilla. Make tiene
muy bun mantenimiento y es muy usado en proyectos de gran envergadura. Pero
respecto a la comodidad, al usar el runtime Deno, este ya tiene un gestor
propio de tareas, por lo que me sería más cómodo usarlo en vez de usar make que
sería externo.
En mi caso, si nu hubiera escogido Deno como runtime, hubiera escogido Make
como gestor de tareas.

## Drake

Otra de las opciones que se nos presenta es **Drake**. Este gestor de tareas
está inspirado en Make, entre otros. Es un gestor explícito de Deno donde las
tareas las escribimos en TypeScript lo que, personalmente, a diferencia de
Make ,que usa `shell`, resulta más cómodo utilizar el mismo lenguaje tanto
en el gestor de tareas como en el código del proyecto.

Sin embargo, uno de los puntos negativos que le veo a Drake es que no tiene
un mantenimiento recurrente, ya que la última versión es de hace unn año y
medio.

## Deno task

La última opción que se nos presenta es el propio gestor de tareas de Deno.
Este gestor de tareas es muy potente y sencillo de usar, y respecto a todos
los demás está integrado en Deno por lo que no habría que usar uno externo.
Deno al ser tan nuevo, tiene un mantenimiento muy activo, por lo que
cualquier problema que pueda surgir se solucionaría rápidamente.

## Elección

Al haber escogido Deno como runtime, he optado por usar el
gestor de tareas integrado de este, ya que es el que mejor se adapta al
criterio de selección.
