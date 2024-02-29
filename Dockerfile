FROM node:20.11.0-buster-slim as base

RUN npm i typescript -g

FROM base as development

WORKDIR /usr/src/app

COPY package.*json .

RUN npm install

COPY . .

CMD ["npm","run","dev"]

FROM base as production

WORKDIR /usr/src/app

COPY package.*json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","run","start"]

