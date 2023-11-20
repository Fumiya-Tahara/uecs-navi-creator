FROM node:20.9.0
WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN [ -f package.json ] && [ -f package-lock.json ] && npm install || echo "No package.json or package-lock.json found. Skipping npm install."
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
