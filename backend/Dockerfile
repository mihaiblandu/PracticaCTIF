FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

COPY target/*.jar app.jar


EXPOSE 8443

ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]