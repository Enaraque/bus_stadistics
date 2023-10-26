# Runtime

Para este proyecto se puede optar por escoger diferentes runtimes,
como NodeJS, Deno o Bun.
En mi caso, he escogido Deno por diversas razones:

- Permite usar Typescript sin necesidad de transpilarlo a diferencia de NodeJS.
- Utiliza un sistema de gestión de dependencias basado en URLs para importar módulos
directamente desde la web. A diferencia de Node.js, que depende de un gestor de paquetes
como `npm` o `yarn`, Deno simplifica la gestión de dependencias al permitirte importar
módulos directamente desde una URL.
- Está escrito en Rust, por lo que es más rápido que NodeJS.
- Tiene un sistema de permisos que permite controlar el acceso a recursos como el sistema,
siendo así más seguro.
- Tiene un sistema de testing integrado.
- Tiene un task runner integrado, lo que nos facilita el uso de este al no tener uno externo.
