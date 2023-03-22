FROM node

LABEL maintainer="hoplin"

RUN mkdir playground
WORKDIR ./playground

COPY . .
RUN npm i\
  && npm i -D

EXPOSE 4000

CMD [ "start-server" ]
ENTRYPOINT [ "npm", "run" ]