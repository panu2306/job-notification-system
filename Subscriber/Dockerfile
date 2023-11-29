FROM openjdk:17
EXPOSE 8082
COPY build/libs/com.jobnotification-1.0-SNAPSHOT.jar subscriber-backend.jar
ENTRYPOINT ["java", "-jar", "/subscriber-backend.jar"]
