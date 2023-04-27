FROM node:11.6.0-alpine AS builder
COPY . ./S3-Bucket-App
WORKDIR /S3-Bucket-App
RUN npm i
RUN npm  build --prod


FROM nginx:1.17.1-alpine
COPY  --from=builder /S3-Bucket-App/dist/s3-bucket-app /usr/share/nginx/html

