import { use, useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import Build from "../../../Domain/Entities/Build";

export default function Builds() {

const { buildService } = useContext(DependencyContext);

const [builds, setBuilds] = useState<Build[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const fetchBuilds = async () => {
        const blds = await buildService.listBuilds();
        setBuilds(blds);
        setIsLoading(false);
    }
    fetchBuilds();
}, [builds]);


if (isLoading)
    return (
        <div>
            <h3>Please wait</h3>
            <h3>Loading builds ...</h3>
        </div>
    );

    return (
        <div>
            <h2>Builds</h2>
            <p>This is the builds page.</p>
            <ul>
                {builds.map((build) => (
                    <li key={build.id}>{build.version}</li>
                ))}
            </ul>
        </div>
    );
}