FROM node:15 as builder

WORKDIR /wearmerge/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate


FROM nginx:stable

COPY --from=builder /wearmerge/frontend/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80