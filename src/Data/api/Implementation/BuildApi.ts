import Build from "../../../Domain/Entities/Build";
import { IBuildApi } from "../Interfaces/IBuildApi";
import { GeneralApi } from "./GeneralApi";
import urls from '../urls.json';
import { GeneralApiResult } from "../../DataTransferObjects/GeneralApiResult";

export class BuildApi extends GeneralApi implements IBuildApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = urls['steletus-app'];
    }

    async createBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['build-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, build);
        return result;
    }
}