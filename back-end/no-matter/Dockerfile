<<<<<<< HEAD
FROM openjdk:11-jdk

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 5000

CMD ["java", "-jar", "application.jar"]
=======
FROM openjdk:17-alpine

ARG JAR_FILE=/build/libs/*.jar

COPY ${JAR_FILE} /app.jar

EXPOSE 5000

ENTRYPOINT ["java","-jar", "/app.jar"]
>>>>>>> develop
