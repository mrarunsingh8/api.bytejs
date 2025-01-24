FROM node:22-alpine

WORKDIR /app/api 

COPY package*.json .

RUN npm install --only=production

COPY . .

EXPOSE 8000

CMD ["node", "index.mjs"]