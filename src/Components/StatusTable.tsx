import ListStatuses from '../../APIsManagers/StatusManager.ts';
import { useState, useEffect } from 'react';
import Status from '../../DataTransferObjects/Status.ts';

interface StatusTableProps {
    realmid: number;
}

export default function StatusTable({ realmid }: StatusTableProps) {
    const [data, setData] = useState<Status[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const statuses = await ListStatuses(realmid);
            setData(statuses);
        };

        fetchData();
    }, [realmid]);

    if (data.length === 0) {
        return <p>Loading data or no data available...</p>;
    }

    return (
        <table className="statustable">
            <thead> 
                <tr>
                    {data.map((status) => (
                        <th key={status.ID} data-statusid={status.ID} className="statuscolumn">
                            {status.Name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {data.map((status) => (
                        <td key={status.ID}></td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}