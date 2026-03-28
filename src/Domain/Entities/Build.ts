export default class Build {
    id: string|null;
    version: string;
    link: string;
    clients: string[];
    constructor(id: string|null, version: string, link: string, clients: string[]) {
        this.id = id;
        this.version = version;
        this.link = link;
        this.clients = clients;
    }
}