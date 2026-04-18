import Client from "../../Domain/Entities/Client";

export interface IClientRepository {   
    getClient(clientId: string): Promise<Client>;
    listClients(): Promise<Client[]>;
    updateClient(client: Client): Promise<void>;
    deleteClient(clientId: string): Promise<void>;
    createClient(client: Client): Promise<void>;
}