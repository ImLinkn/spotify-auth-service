# Spotify Authorization Service

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