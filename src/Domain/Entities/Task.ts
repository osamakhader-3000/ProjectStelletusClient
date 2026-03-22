export default class Task {
    id: string;
    title: string;
    description: string;
    assignedTo?: string;
    assignedBy?: string;

    constructor(id: string, title: string, description: string, assignedTo?: string, assignedBy?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
    }
}