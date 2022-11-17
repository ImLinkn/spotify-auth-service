FROM node:18.12.1
LABEL maintainer="imlinkn"
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
ENTRYPOINT ["/docker/docker-entrypoint.sh"]
CMD ["npm", "start"]