FROM nginx:stable-alpine
WORKDIR /app
COPY . ./

RUN apk add --update nodejs npm

RUN npm install 
RUN npm install react-scripts -g
RUN npm run build

RUN cp -r build/. /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]