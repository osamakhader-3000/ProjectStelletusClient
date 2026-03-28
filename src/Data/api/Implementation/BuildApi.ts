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
    async getBuild(buildId: string): Promise<GeneralApiResult<Build>> {
        let url = `${this.baseUrl}/${urls['build-get']}/${buildId}`;
        let result = await this.GeneralApiCaller<Build>('GET', url);
        return result;
    }
    async updateBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['build-update']}`;
        let result = await this.GeneralApiCaller<boolean>('PUT', url, build);
        return result;
    }
    async deleteBuild(buildId: string): Promise<GeneralApiResult<boolean>> {
        throw new Error("Method not implemented.");
    }
    async listBuilds(): Promise<GeneralApiResult<Build[]>> {
        throw new Error("Method not implemented.");
    }

    async createBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['build-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, build);
        return result;
    }
}