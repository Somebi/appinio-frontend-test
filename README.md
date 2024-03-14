# Appinio test frontend app
This project is using:
- React
- TypeScript
- Vite
- Material Design UI
- Nginx
- Docker

##### All environment variables
```
VITE_API_BACKEND=http://127.0.0.1:5000
```

##### For development:
To run it, do the following:
- `npm install`
- `copy .env.example into .env`
- `npm run dev`
- `then open a link provided in the output`

Hot-reloading will automatically reload frontend while changing typescript code.

##### For production:
To test production build, run this from the main project folder where package.json is located:
- `Change .env variables for production values`
- `npm run build`
- `docker build . --tag registry.digitalocean.com/appinio/frontend`
- `docker run --name appinio_frontend --rm -it -p 8000:80 registry.digitalocean.com/appinio/frontend`
- `make sure that local backend API server is running`
- `open in the browser http://localhost:8000`

##### For deployment:
```
DOCKER_USERNAME=Digicalocean_username_here
DOCKER_PASSWORD=Digicalocean_api_token_here
docker login registry.digitalocean.com -u="${DOCKER_USERNAME}" -p="${DOCKER_PASSWORD}"
docker push registry.digitalocean.com/appinio/frontend
```

##### TODO
- `Design/Style improvements`
- `Kubernetes cluster deployment & configuration`
- `Helm chart for Kubernetes deployment, using above docker image`
- `L7 Load Balancer and service/ingress configuration to work with backend docker image`
- `Git repository && CI/CD configuration for building & deployment into kubernetes`
- `Websockets for LLM generation delivery in live mode or when it's finished if queued in Kafka`
