import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import Build from "../../../Domain/Entities/Build";
import styles from './CssStyles/Builds.module.css'
import { Link } from "react-router";
import { ButtonPreloader } from "../../Components/GeneralComponents/ButtonPreloader";
import { DeleteIconSvg } from "../../Components/GeneralComponents/DeleteIconSvg";
import { EditIconSvg } from "../../Components/GeneralComponents/EditIconSvg";
import { UserRole } from "../../../Domain/Entities/User";

export default function Builds() {

    const { buildService, notificationHandlingBus, userService } = useContext(DependencyContext);

    const [builds, setBuilds] = useState<Build[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buildId, setBuildId] = useState<string | null>(null);
    const [deletingBuildIds, setDeletingBuildIds] = useState<Set<string>>(new Set());
    const [readonly, setReadonly] = useState(true);

    useEffect(() => {
        const fetchBuilds = async () => {
            const blds = await buildService.listBuilds();
            setBuilds(blds);
            setIsLoading(false);

            let currentUser = await userService.GetCurrentUser();
            if (currentUser)
                setReadonly(currentUser.userRole !== UserRole.Administrator && currentUser.userRole !== UserRole.TechnicalSupport);

        }
        fetchBuilds();
    }, []);


    if (isLoading)
        return (
            <div>
                <h3>Please wait</h3>
                <h3>Loading builds ...</h3>
            </div>
        );

    const showDeleteConfirmation = (_buildId: string | null) => {

        if (!_buildId) return;

        setBuildId(_buildId);
        setShowConfirmation(true);

    }

    const deleteBuildConfirmed = () => {
        setShowConfirmation(false);
        handleDeleteBuild(buildId);
    }



    const handleDeleteBuild = async (buildId: string | null) => {

        if (!buildId) return;

        setDeletingBuildIds(prev => new Set(prev).add(buildId));
        let result = await buildService.deleteBuild(buildId);

        if (result) {
            notificationHandlingBus.NotificationOccured("Build deleted successfully");
            var _builds = await buildService.listBuilds();
            setBuilds(_builds);
        }

        setDeletingBuildIds(prev => { const next = new Set(prev); next.delete(buildId!); return next; });

    }
    return (

        <>
            {showConfirmation &&
                <div className={styles.confirmationcontainer} onClick={() => setShowConfirmation(false)}>
                    <div className={styles.confirmationbox} onClick={(e) => e.stopPropagation()}>
                        <h3>Are you sure you want to delete this build?</h3>
                        <div className={styles.confirmationbuttons}>
                            <button className={styles.confirmationbutton} onClick={() => deleteBuildConfirmed()}>Yes</button>
                            <button className={styles.confirmationbutton} onClick={() => setShowConfirmation(false)}>No</button>
                        </div>
                    </div>
                </div>}

            <div className={styles.maincontainer}>
                <div className={styles.buildpagebuttonspanel}>
                    {!readonly &&
                        <Link to={'../addcubesbuild/'} >
                            <button type="button" className={styles.addbuildbuttonclass}>+ Add Build</button>
                        </Link>
                    }
                </div>

                <div className={styles.info}>
                    <h2 className={styles.mainTitle}>Builds</h2>

                    {builds.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.buildstatustitle}>No builds available</h5></div>}

                    {builds.length > 0 && builds.map((build) => (
                        <div key={build.id} className={styles.buildcontainer}>
                            {!readonly &&
                                <span className={styles.buttonscontainer}>
                                    <Link to={`/editcubesbuild/${build.id}`}>
                                        <button className={styles.listbuttonclass}>
                                            <EditIconSvg />
                                        </button>
                                    </Link>
                                    <button className={styles.listbuttonclass} onClick={() => showDeleteConfirmation(build.id)}>
                                        {deletingBuildIds.has(build.id!) ? <ButtonPreloader /> : (
                                            <DeleteIconSvg />
                                        )}
                                    </button>
                                </span>
                            }
                            <span style={{ flex: 1, textAlign: "center", marginLeft: "10%", marginRight: "10%" }}>{build.version}</span>
                            <p>{build.link}</p>
                            {build.clients && build.clients.length > 0 && <div className={styles.clientscontainer}>
                                {build.clients.map((client) => (
                                    <span key={client} className={styles.client}>{client}</span>
                                ))}

                            </div>}
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}