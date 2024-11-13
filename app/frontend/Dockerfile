FROM node:20.12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4173
ENTRYPOINT [ "npm" ]
CMD ["run","dev"]