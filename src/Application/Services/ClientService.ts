import Client from "../../Domain/Entities/Client";
import { IClientService } from "../Interfaces/IClientService";
import { IClientRepository } from "../Repositories/IClientRepository";

export class ClientService implements IClientService{

    clientRepository: IClientRepository;

    constructor(clientRepository: IClientRepository) {
        this.clientRepository = clientRepository;
    }


    getClient(clientId: string): Promise<Client> {
        return this.clientRepository.getClient(clientId);
    }
    
    listClients(): Promise<Client[]> {
        return this.clientRepository.listClients();
    }

    updateClient(client: Client): Promise<void> {
        return this.clientRepository.updateClient(client);
    }

    deleteClient(clientId: string): Promise<void> {
        return this.clientRepository.deleteClient(clientId);
    }

    createClient(client: Client): Promise<void> {
        return this.clientRepository.createClient(client);
    }
}