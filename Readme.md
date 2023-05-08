# Workshop API-Testing

To start the services, run:

```sh
docker compose up -d --build address-validation-service
docker compose up -d --build billing-service
docker compose up -d --build customer-service
docker compose up -d --build delivery-service
```

To start the pact broker, run:

```sh
docker compose up -d --build pact-broker
```

To start the backstage, run:

```sh
docker compose up -d --build backstage
```
