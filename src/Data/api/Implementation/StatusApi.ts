import urls from '../urls.json'
import { IStatusApi } from '../Interfaces/IStatusApi';
import Status from '../../../Domain/Entities/Status';
import axios from 'axios';

export class StatusApi implements IStatusApi{

    private baseUrl: string;

    constructor() {
        this.baseUrl = urls['status-domain'];
    }

    async ListStatuses(realmid: number): Promise<Status[]> {
        let url = urls["status-list"];
        const response = await axios.get(`${this.baseUrl}/${url}`,{params:{realmid:realmid}});
        return response.data.map((s:Status)=>({
            ID:s.ID,
            Name:s.Name
        }));
    }

}
      