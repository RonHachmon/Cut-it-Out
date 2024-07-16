FROM node:22-slim  AS builder
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node ./package.json ./
RUN npm install 
COPY --chown=node:node . .
RUN npm run build

FROM nginx
EXPOSE 5173
COPY ./nginx/default.conf ./etc/nginx/conf.d/default.conf
COPY --from=builder ./home/node/app/dist ./usr/share/nginx/html