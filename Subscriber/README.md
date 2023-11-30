# Subscriber Backend

The Java application acts as a mediator, enabling the exchange of data between the Subscriber React application and the broker Java application. It exposes REST API endpoints that the Subscriber React application can utilize to send and receive data from the broker Java application. This architecture ensures a clean separation of concerns, allowing the Subscriber React application to focus on presenting user interfaces while the Java application handles the complexities of data management and communication with the broker Java application.

## Dependency management, build and deployment

### Dependency management
To manage third-party dependencies, Gradle has been integrated with this application. All the dependencies for this project are added as part of the file build.gradle

Commands used:
```
$ gradle clean build
$ gradle --refresh-dependencies
```

### Building the project
To JAR has been created which is stored at the build folder using the option Build > Build Project in IntelliJ

### Deployment
Leveraging Docker technology, we have streamlined application deployment and scaling processes. The requisite configurations are meticulously outlined in the Dockerfile. To expedite the retrieval of Docker images, we have strategically published them to Docker Hub's Container Image Library (https://docs.docker.com/docker-hub/).

The Docker image is seamlessly pulled onto an AWS EC2 instance and executed as a Docker container. To facilitate communication between containers residing on distinct AWS EC2 instances, we employ Public DNS URLs.

### Commands used:
```
$ docker build -t sub-java-app .
$ docker tag sub-java-app pranav2306/subscriber-backend:latest
$ docker push pranav2306/subscriber-backend
```


