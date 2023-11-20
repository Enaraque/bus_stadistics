# Elección de herramientas para los tests

## Criterio de selección

Mi criterio de selección en las diferentes herramientas de tests se basa en
utilizar las herramientas que me permita tener la menor deuda técnica posible, es
decir, intentar buscar las menos herramientas externas posibles, siempre y cuando
haya una alternativa interna similar. También voy a tener en cuenta si las diferentes
herramientas cuentan con un mantenimiento activo y una documentación clara para
poder usarlas sin complicaciones.

## Aserciones

Para las aserciones, se nos presentan dos opciones:

- [Aserciones propias de Deno](https://deno.land/std@0.206.0/assert/mod.ts):
    Deno tiene un módulo propio para las aserciones.
    Esto me permite poder usar aserciones las cuales son propias del runtime
    que utilizo y no usar unas externas. Cuenta con varias funciones que nos
    pueden venir de gran ayuda en nuestros tests como por ejemplo poder usar
    regex en los asserts con la función `assertMatch()` o la posiblilidad de
    añadir mensajes personalizados como mensaje del assert.

- [Chai](https://deno.land/x/chai@v5.0.0): Chai es una librería de asserts
    utilizada comunmente con node pero tambien es una librería compatible
    con Deno, además tiene una gran comunidad detrás, es bastante usada y
    consta de un mantenimiento activo. Su estilo de asserts se inspira en BDD
    Esta libreria consta con tres tipos de aserciones:
    1. `assert`: Es la aserción más básica, la cual se usa para comprobar si un
    valor es verdadero o falso.
    2. `expect`: La sintaxis del estilo expect es más parecida a una cadena de
    llamadas a funciones encadenadas.
    3. `should`: Su sintaxis es más similar a la escritura natural del lenguaje.

    También permite añadir pluggins lo que la hace más versátil y completa.

En mi caso, he optado por usar las aserciones propias de Deno ya que, aunque a
chai se le puedan añadir diferentes pluggins (aumentando aún más herramientas
externas), cuentan con varias funciones para las aserciones, como las anteriormente
mencionadas, que son bastante interesantes. También, un gran factor a tener en cuenta,
es que estas aserciones están integradas en Deno, y por tanto, se reduce la
deuda técnica.

## Test runner

- [Orange](https://deno.land/x/orange@v0.5.0): Es un framework
    que fue diseñado para ser usado con Mandarime. Para declarar un test, se
    utilizan decoradores. Se tiene que utilizar `tsconfig.json` para su
    fucionamiento, y siempre que queramos correr los test necesitaremos utilizar
    dicho archivo (aumentando aún más la deuda técnica). Su documentación no es
    del todo escasa pero tampoco es muy extensa.
    Su última actualización consta de hace más de dos años por lo que podemos
    asumir que no es un mantenimiento especialmente activo.

- [Merlin](https://deno.land/x/merlin@v1.0.7): Es un framework de deno basado en
    Jest de Javascript.Consta de una documentación bastante amplica y clara.
    Tiene su propias aserciones las cuales son bastantes completas. También
    se puede usar código asíncrono. Además, también tiene herramientas adicionales
    como Maven, útil para hacer benchmarks.
    Su última actualización consta de mayo de 2022 por lo que podemos asumir que
    no es un mantenimiento especialmente activo, ya que lleva más de un año
    sin actualizarse.

- [Deno BDD](https://docs.deno.com/runtime/manual/basics/testing/behavior_driven_development):
    Este es el framework propio de Deno para BDD. Al igual que Deno test, tiene mantenimiento
    activo y una gran comunidad detrás además de una documetació extensa.
    Su principal ventaja es que está integrado y no es externo ademas de su fácil uso.
    Puedes hacer agrupaciones de tests con `describe()` y `it()`, además puedes decidir si
    deseas ignorar tests con `it.ignore` o si solo deseas correr unos tests especificos con
    `it.only`. También tienen hoocks como `beforeAll()` y `afterAll()` para ejecutar código
    antes y después de cada test.

En mi caso, he estado dudando entre usar `Merlin` o el framework propio de Deno para BDD
ya que ambos cuentan con una amplia documentación en comparación con `Orange`.
Al final me he decantado por el framework propio de Deno ya que cuenta con un
mantenimiento activo, a diferenciade `Merlin` que lleva mas de un año sin actualizaciones.
Otro factor, y el más importante es que, al igual que las aserciones, al estar integrado
en Deno, se reduce la deuda técnica.

## CLI

El propio Deno ya cuenta con la suborden `test` que realiza esa labor, por lo que
no es necesario usar ninguna herramienta externa.
