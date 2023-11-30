# Publisher Backend: A Java Application Serving as the Backbone of the Publisher React Frontend

This Java application serves as the backend server for the Publisher React frontend application, enabling seamless communication between the two. It comprises REST API endpoints that facilitate data exchange between the frontend and the broker Java application.

## Managing Dependencies, Building, and Deployment Dependency Management
For efficient third-party dependency management, Gradle has been integrated into the application. All project dependencies are neatly defined within the build.gradle file.

## Relevant Commands:
```
$ gradle clean build
$ gradle --refresh-dependencies
```
## Deployment
Leveraging Docker for rapid application deployment and scaling, the necessary configurations are provided in the Dockerfile. To expedite the process of pulling Docker images, they have been published to the Docker Hub Container Image Library (https://hub.docker.com/).

The Docker image is pulled onto an AWS EC2 instance and executed as a Docker container. Public DNS URLs facilitate communication between containers residing on different AWS EC2 instances.

## Relevant Commands:
```
$ docker build -t pub-java-app .
$ docker tag pub-java-app pranav2306/publisher-backend:1.0
$ docker push pranav2306/publisher-backend:1.0
```