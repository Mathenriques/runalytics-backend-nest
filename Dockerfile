ARG NODE_VERSION=20.11.1
ARG NPM_VERSION=10.2.4

## Development 
FROM docker.io/node:${NODE_VERSION} AS development

# Definição de Variáveis
ARG NPM_VERSION
ENV NPM_VERSION ${NPM_VERSION}
# Definição de Variáveis
ARG NPM_VERSION
ENV NPM_VERSION ${NPM_VERSION}

RUN npm install --location=global npm@${NPM_VERSION}

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

## Production 
FROM docker.io/node:${NODE_VERSION} AS production

# Definição de Variáveis
ARG NPM_VERSION
ENV NPM_VERSION ${NPM_VERSION}

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG DB_TYPE
ENV DB_TYPE=$DB_TYPE

ARG DB_HOST
ENV DB_HOST=$DB_HOST

ARG DB_PORT
ENV DB_PORT=$DB_PORT

ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME

ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD

ARG DB_DATABASE
ENV DB_DATABASE=$DB_DATABASE

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

RUN npm install --location=global npm@${NPM_VERSION}

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package*.json /

RUN npm install --only=prod

COPY . .

CMD ["npm", "run", "start:prod"]