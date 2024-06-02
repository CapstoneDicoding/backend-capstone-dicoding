FROM node:18.13.0
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 8080
CMD [ "npm", "run", "start"]