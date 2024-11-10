FROM node as vite-app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 1000000

COPY . .

RUN ["yarn", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx/nginx.conf /etc/nginx
COPY --from=vite-app ./app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
