FROM node:24

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json apps/backend/
COPY packages ./packages
RUN npm install

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

EXPOSE 5000

CMD ["npm", "run", "dev"]

