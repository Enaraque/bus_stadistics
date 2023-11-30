FROM denoland/deno:alpine

LABEL version="1.0.0"
LABEL author="enriquearakes@correo.ugr.es"

USER deno

WORKDIR /app/test

ENTRYPOINT [ "deno", "task", "test"]