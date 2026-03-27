import { useContext, useState } from 'react';
import { TextBox } from '../GeneralComponents/TextBox';
import style from './CssStyles/CubesBuildForm.module.css';
import { LoadingButton } from '../GeneralComponents/LoadingButton';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import Build from '../../../Domain/Entities/Build';

export function CubesBuildForm() {

    const { buildService, notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
    const navigate = useNavigate();

    const [clients, setClients] = useState([{ id: 0, name: '' }]);
    const [isSaving, setIsSaving] = useState(false);
    const [version, setVersion] = useState('');
    const [link, setLink] = useState('');

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
        navigate('/builds');
    }

    function validateBuild(): boolean {

        if (version == null || version.trim() == '') {
            errorHandlingBus.ErrorOccured('The build version or number is required');
            return false;
        }

        if (version.length > 100) {
            errorHandlingBus.ErrorOccured('Maximum length for the build version or number is 100 characters');
            return false;
        }

        if (link.length > 2000) {
            errorHandlingBus.ErrorOccured('Maximum length for the build link is 2000 characters');
            return false;
        }

        return true;
    }

    async function addBuild() {

        if (!validateBuild())
            return;

        let cubesBuild = new Build('', version, link, clients.map(c => c.name));

        setIsSaving(true);

        let result = await buildService.createBuild(cubesBuild);

        setIsSaving(false);

        if (result) {
            notificationHandlingBus.NotificationOccured('Build added successfully');
            navigate('/builds');
        }

    }

    return (
        <div className={style.maincontainer}>
            <div className={style.formcontainer}>
                <h2>Cubes Build Form</h2>
                <div className={style.elementcontainer}>
                    <TextBox placeholder="Version or number" value={version} onChange={e => setVersion(e.target.value)} />
                </div>
                <div className={style.elementcontainer}>
                    <TextBox placeholder="Link of the build" value={link} onChange={e => setLink(e.target.value)} />
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