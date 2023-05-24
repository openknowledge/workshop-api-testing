# Workshop API-Testing

Start the pact broker:

```sh
docker compose up -d pact
```

Start backstage.io:

```sh
docker compose up -d --build backstage
```

Publish pacts:

```sh
mvn pact:publish ./customer-service
mvn pact:publish ./delivery-service
```


http://localhost:3000/catalog-graph?rootEntityRefs%5B%5D=component%3Adefault%2Fcustomer-service&maxDepth=%E2%88%9E&selectedKinds%5B%5D=api&selectedKinds%5B%5D=component&unidirectional=false&mergeRelations=true&direction=LR&showFilters=true
