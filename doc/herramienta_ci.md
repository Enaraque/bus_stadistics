# Elección de herramientas de Integración Continua (CI)

## Criterios de Selección

Mis criterios de selección para la herramienta de CI son los siguientes:

1. **Servicio gratuito**:
    - Con esto nos aseguramos que no se nos cobrará por el uso de la herramienta.
    Al menos que nos permita una free tier para poder utilizarla.
2. **Compatibilidad con GitHub**:
    - Asegurar que la herramienta sea compatible con GitHub, ya que es la plataforma
    que utilizamos para el desarrollo de nuestro proyecto.
3. **Servicio en línea**:
    - Asegurar que la herramienta sea un servicio en línea, ya que no queremos
    tener que instalar nada en nuestro ordenador.
4. **Integración con docker**:
    - Al usarlo en el proyecto, es importante que la herramienta
    de CI sea compatible con docker para poder realizar las pruebas de integración.

## Herramientas de CI Consideradas

Para hacer la elección de herramientas de CI he tenido en cuenta las siguientes herramientas:

Estas herramientas las he separado en dos grupos, las que son de pago y las que son gratuitas.

### Herramientas de Pago

- [CircleCI](https://circleci.com/): Herramienta de CI/CD que permite automatizar la construcción, pruebas y despliegue de software. Es compatible con GitHub y no es necesaria instalación local. Además, tiene una free tier para poder utilizarla. El principal problema es que es una herramienta muy utilizada en los proyectos de la asignatura por lo que se intntara utilizar otra herramienta para no tener problemas.

- [TravisCI](https://travis-ci.com/): Nos permite, al ser estudiantes, una versión gratuita de 1 mes de uso.
Tiene integración con docker y consta de una documentación de la que poder mirar a la hora de utilizarla.
También es compatible con GitHub y no necesita instalación en mi máquina.

- [SemaphoreCI](https://semaphoreci.com/): Prueba gratuita de 14 días. Es compatible con GitHub y se puede usar en línea. Lo malo es que al tener tan poco tiempo de prueba la utilizaría menos tiempo del
que me gustaría.

- [AppVeyor](https://www.appveyor.com/docs/): Ofrece una versión gratuita con ciertas limitaciones, pero es fácil de configurar y no requiere instalación local. Soporta Docker, lo que facilita la ejecución de pruebas de integración y se puede usar con diferentes SO.

### Herramientas Gratuitas

- GitHub Actions: Herramienta propia de github de CI. Bastaste utilizada y documentación extensa con varias extensiones. Compatible con docker.

- [GitLab CI](https://docs.gitlab.com/ee/ci/): Herramienta de CI de GitLab. Buena documentación y permite
importar tu repositorio de GitHub para poder hacer el CI. Al igual que gitHub Actions, es una herramienta
bastante utilizada. También es compatible con docker y no es necesaria su instalación local.

- [Jenkins](https://www.jenkins.io/): Además de la versión de pago, Jenkins también ofrece una versión comunitaria de código abierto. Aunque puede requerir más configuración manual, proporciona una solución sólida y gratuita para la integración continua. La comunidad activa y la amplia gama de plugins hacen que sea una opción viable para proyectos de diferentes tamaños. Una de sus principales inconvenientes es que hay que instalarlo en la máquina local.

- [Drone](https://docs.drone.io/):  Drone CI es una plataforma de CI/CD moderna y de código abierto. Ofrece una integración sencilla con GitHub y un sistema basado en contenedores que lo hace compatible con Docker. La configuración se realiza a través de archivos YAML, lo que facilita la definición de flujos de trabajo. A pesar de ser gratuito, proporciona características avanzadas para la automatización de proyectos.

## Selección

Las diferentes opciones han sido Travis y GitHub Actions. Jenkings es una herramienta interesante pero al tener que instalarla localmeente y configurarla a mano hace que no sea una de las opciones principales.
De estas, las que más me han convencido, tanto por el tiempo gratuito de uso como por la compatibilidad con GitHub han sido Travis y GitHub Actions (obviamente).
