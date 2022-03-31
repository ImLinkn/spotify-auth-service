FROM node:16.14.2
LABEL maintainer="imlinkn"
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
ENTRYPOINT ["/docker/docker-entrypoint.sh"]
CMD ["npm", "start"]