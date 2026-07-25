FROM node:24

WORKDIR /app

COPY package*.json ./
COPY apps/frontend/package*.json apps/frontend/
COPY packages ./packages
RUN npm install

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

