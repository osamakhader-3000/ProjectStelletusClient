export default class Build {
    id: string|null;
    version: string;
    link: string;
    clients: string[];
    updatedAt: Date;
    updatedBy: string;
    constructor(id: string|null, version: string, link: string, clients: string[], updatedAt: Date, updatedBy: string) {
        this.id = id;
        this.version = version;
        this.link = link;
        this.clients = clients;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }
}