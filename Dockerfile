FROM node:22-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app/api 

COPY package*.json .

RUN npm install --only=production --ignore-scripts

COPY ./config ./config
COPY ./routes ./routes
COPY ./schemas ./schemas
COPY ./index.mjs .

RUN chown -R appuser:appgroup /app

USER appuser


EXPOSE 8000

CMD ["node", "index.mjs"]