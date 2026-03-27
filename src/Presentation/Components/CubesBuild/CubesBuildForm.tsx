import { useContext, useState } from 'react';
import { TextBox } from '../GeneralComponents/TextBox';
import style from './CssStyles/CubesBuildForm.module.css';
import { LoadingButton } from '../GeneralComponents/LoadingButton';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';

export function CubesBuildForm() {

    const { taskService, notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
    const navigate = useNavigate();

    const [clients, setClients] = useState([{ id: 0, name: '' }]);
    const [isSaving, setIsSaving] = useState(false);

    function addClientAfter(afterId: number) {
        setClients(prev => {
            const index = prev.findIndex(c => c.id === afterId);
            const newClient = { id: Date.now(), name: '' };
            const next = [...prev];
            next.splice(index + 1, 0, newClient);
            return next;
        });
    }

    function removeClient(id: number) {
        setClients(prev => prev.filter(c => c.id !== id));
    }

    function updateClientName(id: number, value: string) {
        setClients(prev => prev.map(c => c.id === id ? { ...c, name: value } : c));
    }

    function handleCancel() {
        // Implement cancel logic, e.g., navigate back or clear form
        navigate(-1); // Navigate back to the previous page
    }

    function addBuild() {
        // Implement add build logic, e.g., validate input and send data to backend
    }

    return (
        <div className={style.maincontainer}>
            <div className={style.formcontainer}>
                <h2>Cubes Build Form</h2>
                <div className={style.elementcontainer}>
                    <TextBox placeholder="Version or number" />
                </div>
                <div className={style.elementcontainer}>
                    <TextBox placeholder="Link of the build" />
                </div>
                <br /><br />
                <p>Clients has the build:</p>
                <div className={`${style.elementcontainer} ${style.clientContainer}`}>
                    {clients.map(client => (
                        <div key={client.id} className={style.clientInnerContainer}>
                            <TextBox value={client.name} onChange={e => updateClientName(client.id, e.target.value)} />
                            <button onClick={() => addClientAfter(client.id)}>+</button>
                            <button className={clients.length > 1 ? '' : style.hidden} onClick={() => removeClient(client.id)}>-</button>
                        </div>
                    ))}
                </div>
                <div className={`${style.elementcontainer} ${style.elementbuttoncontainer}`}>

                    <LoadingButton cssClass={`${style.formbutton} ${style.formokbutton}`} onClick={addBuild} label='Add' isLoading={isSaving} />

                    <button className={style.formbutton} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}