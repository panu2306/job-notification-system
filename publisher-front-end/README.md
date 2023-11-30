# Publisher Frontend

This React application serves as the front-end interface for the Publisher Java backend application. It utilizes REST API endpoints and dedicated pages to facilitate communication with the Publisher Java application.

## Creation, Dependency management, build and deployment

### Creating the react app

```
$ npm create-react-app publisher-app
```

### Dependency management

To manage third-party dependencies, npm install was used.

For example:

```
$ npm install axios
```

### Run the application

```
$ npm start
```

### Deployment

To expedite application deployment and scaling, Docker has been employed. The necessary configurations are detailed in the Dockerfile. To accelerate the process of pulling Docker images, they have been published to Docker Hub's Container Image Library (https://hub.docker.com/)

The Docker image is pulled onto an AWS EC2 instance and executed as a Docker container. For inter-container communication across multiple AWS EC2 instances, Public DNS URLs are utilized.


## Commands used:

```
$ docker build -t pub-react-app .
$ docker tag pub-react-app pranav2306/publisher-frontend:latest
$ docker push pranav2306/publisher-frontend
```
