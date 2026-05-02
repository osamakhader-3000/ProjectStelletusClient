import Client from "./Client";

export default class Build {
    id: string|null;
    version: string;
    link: string;
    clients: Client[];
    updatedAt: Date|null;
    updatedBy: string|null;
    constructor(id: string|null, version: string, link: string, clients: Client[], updatedAt: Date|null, updatedBy: string|null) {
        this.id = id;
        this.version = version;
        this.link = link;
        this.clients = clients;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }
}