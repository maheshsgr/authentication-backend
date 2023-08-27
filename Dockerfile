FROM node:16
WORKDIR /app
COPY package*.json yarn.lock ./
COPY ./ ./
RUN yarn install
CMD ["yarn", "start"]
ENV BACKEND_PORT=3001
ENV MONGODB="mongodb+srv://developermaheshsagar:JzNaRm4ismHpTMzg@skidocluster0.tmw8k4c.mongodb.net/?retryWrites=true&w=majority"
ENV SECRET="skidos-strong-password"
