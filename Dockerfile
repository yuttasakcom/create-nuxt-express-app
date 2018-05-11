FROM keymetrics/pm2:latest-alpine

RUN mkdir -p /otp/app

WORKDIR /otp/app
COPY . .
RUN npm install && npm run build
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]