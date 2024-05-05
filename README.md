# Spotify Authorization Service
[![GitHub License](https://img.shields.io/github/license/ImLinkn/spotify-auth-service?style=flat-square&label=License&logo=GitHub)](LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/ImLinkn/spotify-auth-service?style=flat-square&logo=GitHub&label=Release)](https://github.com/ImLinkn/spotify-auth-service/releases)
<a href="#">![GitHub repo size](https://img.shields.io/github/repo-size/ImLinkn/spotify-auth-service?style=flat-square&logo=GitHub&label=Repo%20Size)</a>
[![Spotify Web API](https://img.shields.io/badge/Spotify_Web_API-1DB954?style=flat-square&logo=Spotify&logoColor=FFFFFF)](https://developer.spotify.com/documentation/web-api)
[![Docker](https://img.shields.io/badge/Docker-1D63ED?style=flat-square&logo=Docker&logoColor=FFFFFF)](https://www.docker.com/products/docker-desktop/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=FFFFFF)](https://nodejs.org/)
[![Code Style: Prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Intent
To create a **microservice** which is able to retrieve a Spotify access token using the [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/). More, the microservice should be able to detect if the token request should refresh the existing token from a singular endpoint.

Using this microservice in a decoupled architecture, a developer can create detached microservices or standalone applications which access the [Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/) and use this microservice to manage the retrieval and refreshing of access tokens in a localized context.

This microservice, in its current form, does not facilitate the storage of multiple access tokens based on multiple user logins.

## Requirements
- [nvm](https://github.com/nvm-sh/nvm) or, *not recommended*, a local installation of [Node.js](https://nodejs.org/en/download/)
- *Optional*: [Docker](https://docs.docker.com/get-docker/)

## Build Instructions
In order to successfully build and deploy the authorization service, you **must** [set up a new app](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/).

### Spotify App Setting Configuration
- **Application name**: SpotifyAuthService
- **Application description**: YOUR_APPLICATION_DESCRIPTION
- **Website**: http://localhost:8081
- **Redirect URIs**: http://localhost:8081/callback
- **Bundle IDs**: N/A
- **Android Packages**: N/A

### Local Build
1. Copy the included `.env.example` file and name the new file as `.env`.
2. Replace the placeholder values with your client ID and client secret. Edit the SCOPES values as needed for your use case.
3. Install project dependencies via `npm install`.
4. Run the project via `npm start` or, if you are currently undergoing active development, via `npm run dev`.
5. Using a browser, navigate to `http://localhost:8081/token` and login to Spotify using your credentials.
6. Verify that you retrieved an access token **upon successful login**.

### Containerized Build
1. Create your image via `docker image build -t spotify-auth-service .`.
2. Ensure your Docker Swarm is initialized via `docker swarm init`.
3. Add the following Docker secrets via `echo "some value" | docker secret create SECRET_NAME -`:
    - spotify-client-id: **YOUR SPOTIFY APP CLIENT ID**
    - spotify-client-secret: **YOUR SPOTIFY APP CLIENT SECRET**
4. Update the SCOPES environment variable in `./docker/prod.yml` as needed for your use case.
5. Deploy your stack via `docker stack deploy -c ./docker/prod.yml STACK_NAME`.
6. Using a browser, navigate to `http://localhost:8081/token` and login to Spotify using your credentials.
7. Verify that you retrieved an access token **upon successful login**.

## Socials
[![Twitch Status](https://img.shields.io/twitch/status/imlinkn?style=flat-square&logo=Twitch&logoColor=white&label=ImLinkn&labelColor=9146FF&color=ED0400)](https://twitch.tv/ImLinkn/about)
[![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCibbRAG4HegVkaWjN9qG-pQ?style=flat-square&logo=YouTube&logoColor=FFFFFF&label=%40ImLinkn&labelColor=FF0000&color=282828)](https://www.youtube.com/@ImLinkn)
[![Discord Profile](https://img.shields.io/badge/ImLinkn-5865F2?style=flat-square&logo=Discord&logoColor=FFFFFF)](http://discordapp.com/users/ImLinkn#6969)
[![Follow My X (Twitter)](https://img.shields.io/badge/Follow_%40ImLinkn-282828?style=flat-square&logo=X&logoColor=FFFFFF)](https://twitter.com/intent/follow?screen_name=ImLinkn)
[![Reddit Profile](https://img.shields.io/badge/u%2FImLinkn-FF4500?style=flat-square&logo=Reddit&logoColor=FFFFFF)](https://www.reddit.com/user/ImLinkn/)

Feel free to reach out to me at any above platform!