# Broker

This Java application serves as the central broker in the publisher-subscriber application. It is responsible for creating new topics based on newly added companies, maintaining a repository of jobs associated with each topic, and broadcasting these jobs to interested subscribers based on their individual subscription preferences.

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
To expedite application deployment and scaling, we have leveraged Docker technology. The necessary configurations are meticulously outlined in the Dockerfile. To streamline the process of retrieving Docker images, we have strategically published them to Docker Hub's Container Image Library (https://docs.docker.com/docker-hub/).

By employing Docker, we have achieved remarkable efficiency in application deployment and scaling. The Dockerfile serves as a comprehensive guide, detailing the requisite configurations for each containerized application. Additionally, we have strategically published our Docker images to Docker Hub's Container Image Library, significantly streamlining the image retrieval process.

The utilization of Public DNS URLs enables seamless communication between containers across multiple AWS EC2 instances. This approach ensures that data exchange remains uninterrupted, regardless of the physical location of the containers.

Commands used:
```
$ docker build -t broker-java-app .
$ docker tag broker-java-app ruchidhore/broker:latest
$ docker push ruchidhore/broker
```


