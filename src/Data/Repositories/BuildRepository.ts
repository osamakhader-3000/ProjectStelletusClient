import { IBuildRepository } from "../../Application/Repositories/IBuildRepository";
import Build from "../../Domain/Entities/Build";
import { IBuildApi } from "../api/Interfaces/IBuildApi";
import { IAuthService } from "../Commons/IAuthService";
import { GeneralApiResult } from "../DataTransferObjects/GeneralApiResult";

export class BuildRepository implements IBuildRepository {

    buildApi: IBuildApi;
    authService: IAuthService;

    constructor(buildApi: IBuildApi, authService: IAuthService) {
        this.buildApi = buildApi;
        this.authService = authService;
    }
    async getBuild(buildId: string): Promise<Build> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Build>>>(async () => {
            return this.buildApi.getBuild(buildId);
        });
        return result?.data ?? new Build('', '', '', []);

    }
    updateBuild(build: Build): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteBuild(buildId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    listBuilds(): Promise<Build[]> {
        throw new Error("Method not implemented.");
    }

    async createBuild(build: Build): Promise<boolean> {

        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.buildApi.createBuild(build);
        });
        return result?.success ?? false;

    }
}