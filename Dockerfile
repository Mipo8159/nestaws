FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/main.js"]


FROM node:18-alpine AS production 

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=development /usr/src/app/dist /dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 5000

CMD ["node", "dist/main.js"]