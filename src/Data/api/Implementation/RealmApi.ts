import axios from 'axios';
import Realm from '../../../Domain/Entities/Realm';
import urls from '../urls.json'
import { IRealmApi } from '../Interfaces/IRealmApi';

export class RealmApi implements IRealmApi {

    private baseUrl: string;

    constructor() {
        this.baseUrl = urls['realms-domain'];
    }

    async listRealmsByName(name: string): Promise<Realm[]> {
        try {
            let url = urls['realms-list'];
            if(name != null)
                url+='?name='+name;
          const response = await axios.get(`${this.baseUrl}/${url}`);
          return response.data.map((d:Realm)=> ({
            id: d.id,
            name: d.name,
            description: d.description,
          }));
        } catch (error: unknown) {
          if (error instanceof Error)
            throw new Error(`Failed to fetch data: ${error.message}`);
          else
            throw new Error;
        }
      }
}