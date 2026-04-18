import { useContext, useEffect, useState } from "react";
import Client from "../../../Domain/Entities/Client";
import { DependencyContext } from "../../../context/DependencyContext";

export default function ViewCubesClient() {

    const { clientService } = useContext(DependencyContext);
    const [client, setClient] = useState<Client | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchClient = async () => {
            const clientId = window.location.pathname.split("/").pop();
            if (!clientId) return;
            const fetchedClient = await clientService.getClient(clientId);
            setClient(fetchedClient);
            setIsLoading(false);
        };
        fetchClient();
    }, []);

    if (isLoading)
        return (
            <div>
                <h3>Please wait</h3>
                <h3>Loading cubes client ...</h3>
            </div>
        );

    if (!client)
        return (
            <div>
                <h3>Client not found</h3>
            </div>
        );

    return (
        <div>
            <h2>{client.name}</h2>
            <p>{client.description}</p>
            <h3>Builds</h3>
            <ul>
                {client.builds.map(build => (
                    <li key={build.id}>{build.version}</li>
                ))}
            </ul>
            <h3>Current Change Request</h3>
            <p>{client.currentChangeRequest}</p>
            <h3>Last Change Request</h3>
            <p>{client.lastChangeRequest}</p>
        </div>
    );
}
