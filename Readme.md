# Workshop API-Testing

## Start the containers
Start the pact and backstage container with docker compose:

```sh
docker compose up -d 
```

After that you can see the four services with their provided APIs in the backstage catalog:
- [Backstage Catalog](http://localhost:7007/)

The relationships in the catalog graph should only show the provided API of the customer service: 
- [Catalog Graph](http://localhost:7007/catalog-graph?rootEntityRefs%5B%5D=component%3Adefault%2Fcustomer-service&maxDepth=%E2%88%9E&selectedKinds%5B%5D=api&selectedKinds%5B%5D=component&unidirectional=false&mergeRelations=true&direction=LR&showFilters=true)

## Publish pacts:

To publish the pacts you can execute the following commands:
```sh
mvn pact:publish ./customer-service
mvn pact:publish ./delivery-service
```

After publishing the pacts you can see the relationships of the customer-service in the catalog graph: [Catalog Graph](http://localhost:7007/catalog-graph?rootEntityRefs%5B%5D=component%3Adefault%2Fcustomer-service&maxDepth=%E2%88%9E&selectedKinds%5B%5D=api&selectedKinds%5B%5D=component&unidirectional=false&mergeRelations=true&direction=LR&showFilters=true)