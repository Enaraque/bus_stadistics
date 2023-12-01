FROM hayd/alpine-deno

LABEL version="1.0.0" \
      author="enriquearakes@correo.ugr.es"

RUN deno upgrade
USER deno

WORKDIR /app/test

ENTRYPOINT [ "deno", "task", "test"]