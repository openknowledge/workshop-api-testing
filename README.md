## Workshop API Testing

This repository contains samples for the workshop API Testing.

# Running the samples of the workshop

The samples run with Docker Compose.
So please ensure you have docker installed in a recent version.

Start the examples by typing

```
docker compose up --build
```

from within the folder you cloned the repository.

# Exercises

You find the exercises in the corresponding branches

* [Exercise OpenAPI](https://github.com/openknowledge/workshop-api-testing/tree/openapi)
* [Exercise Wiremock](https://github.com/openknowledge/workshop-api-testing/tree/wiremock)
* [Exercise Postman](https://github.com/openknowledge/workshop-api-testingy/tree/postman-test)
* [Exercise Postman with authentication](https://github.com/openknowledge/workshop-api-testingy/tree/authentication-test)
* [Exercise Versioning](https://github.com/openknowledge/workshop-api-testing/tree/versioning)
* [Exercise Pact](https://github.com/openknowledge/workshop-api-testing/tree/pact)
* [Exercise Pact-Broker](https://github.com/openknowledge/workshop-api-testing/tree/pact-broker)
* [Exercise Pipeline](https://github.com/openknowledge/workshop-api-testing/tree/pipeline)
* [Exercise Pact-Tags](https://github.com/openknowledge/workshop-api-testing/tree/pact-tags)
* [Exercise Webhook](https://github.com/openknowledge/workshop-api-testing/tree/webhook)

## Troubleshooting (Mac M1 processor)

The keycloak image used in some of the excercises
is not compatible with the new M1 processor of Mac.
In order to run the samples, you have to build the container from scratch:

```
git clone git clone https://github.com/keycloak/keycloak-containers.git keycloak/containers
docker build -t jboss/keycloak:14.0.0 ./keycloak
```
