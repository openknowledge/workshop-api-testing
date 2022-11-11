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

Import the file `API-Testing.postman_collection.json` into Postman and execute tests.

## Troubleshooting (Mac M1 processor)

The keycloak image used in some of the excercises
is not compatible with the new M1 processor of Mac.
In order to run the samples, please checkout main branch first
and follow the instructions there.
