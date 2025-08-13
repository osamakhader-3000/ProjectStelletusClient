import { useContext } from 'react';
import { DependencyContext } from '../../context/DependencyContext';
import Realm from '../../Domain/Entities/Realm'

export function useListRealmsByName() {
    const { realmService } = useContext(DependencyContext);

    async function List(name: string): Promise<{ realms: Realm[]; errorMessage?: string;showError:boolean; }> {
        try {
            const realms = await realmService.listRealmsByName(name);
            return { realms, errorMessage: undefined,showError:false };
        } catch (error: any) {
            return { realms: [], errorMessage: error.message,showError:true };
        }
    }

    return List;
}