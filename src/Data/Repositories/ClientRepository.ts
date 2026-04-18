import { IClientRepository } from "../../Application/Repositories/IClientRepository";
import Client from "../../Domain/Entities/Client";

export class ClientRepository implements IClientRepository {

        localStorageKey = "clients";

        async getClient(clientId: string): Promise<Client> {
            const clients = await this.listClients();
            const client = clients.find(c => c.id === clientId);
            if (client) {
                return client;
            }
            throw new Error("Client not found");
        }

        async listClients(): Promise<Client[]> {
            const clientsJson = localStorage.getItem(this.localStorageKey);
            if (clientsJson) {
                return JSON.parse(clientsJson) as Client[];
            }
            return [];

        }

        async updateClient(client: Client): Promise<void> {
            var clients = await this.listClients();
            const index = clients.findIndex(c => c.id === client.id);
            if (index !== -1) {
                clients[index] = client;
                localStorage.setItem(this.localStorageKey, JSON.stringify(clients));
            }
        }

        async deleteClient(clientId: string): Promise<void> {
            var clients = await this.listClients();
            clients = clients.filter(c => c.id !== clientId);
            localStorage.setItem(this.localStorageKey, JSON.stringify(clients));
        }

        async createClient(client: Client): Promise<void> {
            var clients = await this.listClients();
            clients.push(client);
            localStorage.setItem(this.localStorageKey, JSON.stringify(clients));
        }

}