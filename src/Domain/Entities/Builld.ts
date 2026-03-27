export default class Build {
    id: string;
    version: string;
    link: string;
    clients: string[];
    constructor(id: string, version: string, link: string, clients: string[]) {
        this.id = id;
        this.version = version;
        this.link = link;
        this.clients = clients;
    }
}