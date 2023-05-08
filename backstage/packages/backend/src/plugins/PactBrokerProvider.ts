import {ComponentEntity, ComponentEntityV1alpha1, Entity} from '@backstage/catalog-model';
import { EntityProvider, EntityProviderConnection } from '@backstage/plugin-catalog-node';

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

        /*const response = await fetch(this.pactApiUrl);
        const entities: Entity[] = new Array(1);//= await response.json();
        const e: ComponentEntityV1alpha1 = new ComponentEntityV1alpha1*/
        //entities.push()

        /** [6] */
        /*await this.connection.applyMutation({
            type: 'full',
            entities: entities.map((entity) => ({
                entity,
                locationKey: `pact-broker-provider:${this.env}`,
            })),
        });*/
    }
}
