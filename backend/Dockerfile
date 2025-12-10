
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN npm ci --production

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]