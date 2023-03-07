FROM node:19-alpine3.16

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package*.json .
RUN npm install 
COPY . .

EXPOSE 3000

CMD ["npm","start"]

