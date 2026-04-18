import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import Client from "../../../Domain/Entities/Client";
import styles from './CssStyles/Clients.module.css';
import { Link } from "react-router";
import { EditIconSvg } from "../../Components/GeneralComponents/EditIconSvg";
import { DeleteIconSvg } from "../../Components/GeneralComponents/DeleteIconSvg";
import { ButtonPreloader } from "../../Components/GeneralComponents/ButtonPreloader";
import { UserRole } from "../../../Domain/Entities/User";

export default function Clients() {

    const { clientService, userService } = useContext(DependencyContext);

    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingClientIds, setDeletingClientIds] = useState<Set<string>>(new Set());
    const [readonly, setReadonly] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            const result = await clientService.listClients();
            setClients(result);
            setIsLoading(false);

            let currentUser = await userService.GetCurrentUser();
            if (currentUser)
                setReadonly(currentUser.userRole !== UserRole.Administrator && currentUser.userRole !== UserRole.TechnicalSupport);

        };
        fetchClients();
    }, []);

    const showDeleteConfirmation = (_ClientId: string | null) => {

        if (!_ClientId) return;


    }

    if (isLoading)
        return (
            <div>
                <h3>Please wait</h3>
                <h3>Loading clients ...</h3>
            </div>
        );

    return (
        <div className={styles.maincontainer}>

            <div className={styles.clientpagebuttonspanel}>
                {!readonly &&
                    <Link to={'../addcubesclient/'} >
                        <button type="button" className={styles.addClientbuttonclass}>+ Add Client</button>
                    </Link>
                }
            </div>

            <div className={styles.info}>
                <h2 className={styles.mainTitle}>Clients</h2>

                {clients.length === 0 && (
                    <div className={styles.emptycontainer}>
                        <h5 className={styles.clientstatustitle}>No clients available</h5>
                    </div>
                )}

                {clients.length > 0 && clients.map((client) => (
                    <div key={client.id} className={styles.clientcontainer}>
                        <div className={styles.clientHeader}>
                            <span className={styles.clientName}>{client.name}</span>
                            <span className={styles.actionButtons}>
                                <Link to={`/editcubesclient/${client.id}`} className={styles.editButton}>
                                    <button className={styles.listbuttonclass}>
                                        <EditIconSvg />
                                    </button>
                                </Link>

                                {!readonly &&
                                    <button className={styles.listbuttonclass} onClick={() => showDeleteConfirmation(client.id)}>
                                        {deletingClientIds.has(client.id!) ? <ButtonPreloader /> : (
                                            <DeleteIconSvg />
                                        )}
                                    </button>
                                }
                            </span>
                        </div>
                        <table className={styles.clientstable}>
                            <tbody>
                                <tr>
                                    <td className={styles.clientTitleCell}>Description:</td>
                                    <td>{client.description}</td>
                                </tr>
                                <tr>
                                    <td className={styles.clientTitleCell}>Current Change Request:</td>
                                    <td >{client.currentChangeRequest}</td>
                                </tr>
                                <tr>
                                    <td className={styles.clientTitleCell}>Last Change Request:</td>
                                    <td >{client.lastChangeRequest}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}
