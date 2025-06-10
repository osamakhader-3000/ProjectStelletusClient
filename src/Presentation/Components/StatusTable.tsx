import { DependencyContext } from '../../context/DependencyContext';
import { useState, useEffect,useContext } from 'react';
import Status from '../../Domain/Entities/Status';
import styles from './StatusTable.module.css'

interface StatusTableProps {
    realmid: number;
}

export default function StatusTable({ realmid }: StatusTableProps) {

    const {statusService} = useContext(DependencyContext);

    const [data, setData] = useState<Status[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const statuses = await statusService.ListStatuses(realmid);
            setData(statuses);
        };

        fetchData();
    }, [realmid]);

    if (data.length === 0) {
        return <p>Loading data or no data available...</p>;
    }

    return (
        <table className={styles.statustable}>
            <thead> 
                <tr>
                    {data.map((status) => (
                        <th key={status.ID} data-statusid={status.ID} className={styles.statuscolumn}>
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