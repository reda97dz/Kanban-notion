FROM node:16-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

EXPOSE 5173

CMD ["npm", "run", "dev"]