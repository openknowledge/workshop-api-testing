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

# Exercise

Run
```
docker run --rm -t -v $(pwd)/customer-service/src/main/resources/META-INF:/specs:ro openapitools/openapi-diff:2.0.1 /specs/v1.0.yaml /specs/v1.1.yaml
```
to compare the versions.
