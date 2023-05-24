import {
    ApiEntity,
    ComponentEntity,
    ComponentEntityV1alpha1,
    isApiEntity,
    isComponentEntity,
    Entity
} from "@backstage/catalog-model";
import { EntityProvider, EntityProviderConnection } from '@backstage/plugin-catalog-node';
import {PactsEntity} from "./types/PactsEntity";
import { readFileSync } from 'fs';

const catalogFiles = new Map<string, string>([
    ["address-validation-service", "./../../examples/address-validation-service/catalog.json"],
    ["billing-service", "./../../examples/billing-service/catalog.json"],
    ["customer-service", "./../../examples/customer-service/catalog.json"],
    ["delivery-service", "./../../examples/delivery-service/catalog.json"]
]);

function findComponentEntityByName(entities: Entity[], componentName: string): ComponentEntityV1alpha1 | undefined {
    const componentEntities: Entity[] = entities
        .filter(entity => isComponentEntity(entity));
    let entity = componentEntities.find(entity => entity.metadata.name === componentName);
    if (entity === undefined || !isComponentEntity(entity)) {
        return undefined;
    }
    return entity;
}

function createComponentEntity(name: string): ComponentEntity {
    return {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'Component',
        metadata: {
            name: name,
            annotations: {
                'backstage.io/managed-by-origin-location':
                    'url:http://localhost:9080/service-repository/api/backstage/catalog-info.yaml',
                'backstage.io/managed-by-location':
                    'url:http://localhost:9080/service-repository/api/backstage/catalog-info.yaml',
            }
        },
        spec: {
            type: 'service',
            lifecycle: 'experimental',
            owner: 'guests',
            providesApis: [],
            consumesApis: [],
        },
    }
}

function findApiEntityByName(entities: Entity[], apiName: string): Entity | undefined {
    const componentEntities: Entity[] = entities
        .filter(entity => isApiEntity(entity));
    return componentEntities.find(entity => entity.metadata.name === apiName);
}

function createApiEntity(name: string): ApiEntity {
    return {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'API',
        metadata: {
            name: name,
            annotations: {
                'backstage.io/managed-by-origin-location':
                    'url:http://localhost:9080/service-repository/api/backstage/catalog-info.yaml',
                'backstage.io/managed-by-location':
                    'url:http://localhost:9080/service-repository/api/backstage/catalog-info.yaml',
            }
        },
        spec: {
            type: 'openapi',
            lifecycle: 'experimental',
            owner: 'guests',
            definition: 'Some definition here'
        },
    }
}

/**
 * Provides entities from fictional frobs service.
 */
export class PactBrokerProvider implements EntityProvider {
    private readonly env: string;
    private readonly pactApiUrl: string;
    protected connection?: EntityProviderConnection;

    /** [1] */
    constructor(env: string, pactApiUrl: string) {
        this.env = env;
        this.pactApiUrl = pactApiUrl;
    }

    /** [2] */
    getProviderName(): string {
        return `pact-broker-provider-${this.env}`;
    }

    /** [3] */
    async connect(connection: EntityProviderConnection): Promise<void> {
        this.connection = connection;
    }

    /** [4] */
    async run(): Promise<void> {
        if (!this.connection) {
            throw new Error('PactBrokerProvider is not initialized');
        }

        // /** [5] */
        // fetch pact response from pact-API and parse to the pactEntity type
        const response = await fetch(this.pactApiUrl);
        const pactEntity: PactsEntity = await response.json();

        // Create all backstageEntities from the pactEntities
        let entities: Entity[] = [];
        pactEntity.pacts.forEach(pact => {
            // If the API of the provider is not already in the entities array, create and add it
            const apiName = pact._embedded.provider.name + '-api';
            let apiEntity = findApiEntityByName(entities, apiName);
            if (apiEntity === undefined) {
                apiEntity = createApiEntity(apiName);
                entities.push(apiEntity);
            }

            // If the Component of the provider is not already in the entities array, create and add it
            let providerEntity = findComponentEntityByName(entities, pact._embedded.provider.name);
            if (providerEntity === undefined) {
                providerEntity = createComponentEntity(pact._embedded.provider.name);
                entities.push(providerEntity);
            }

            // If the Component of the consumer is not already in the entities array, create and add it
            let consumerEntity = findComponentEntityByName(entities, pact._embedded.consumer.name);
            if (consumerEntity === undefined) {
                consumerEntity = createComponentEntity(pact._embedded.consumer.name);
                entities.push(consumerEntity);
            }

            // Add the API to the consumer and provider
            providerEntity.spec.providesApis?.push(apiName);
            consumerEntity.spec.consumesApis?.push(apiName);
        });

        console.log("pact-broker-provider: Found " + entities.length + " Pact entities")

        // Add all service entities from the specific catalog.json to the Entity-array, if they are not added by pact.
        catalogFiles.forEach((path, fileName) => {
            if (!entities.map(entity => entity.metadata.name).includes(fileName)) {
                const catalogEntities: Entity[] = JSON.parse(readFileSync(path, 'utf-8'));
                catalogEntities.forEach(e => entities.push(e));
            }
        })

        /** [6] */
        await this.connection.applyMutation({
            type: 'full',
            entities: entities.map((entity) => ({
                entity,
                locationKey: `pact-broker-provider:${this.env}`,
            }))
        });
    }
}
