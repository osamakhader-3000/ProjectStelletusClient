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

    async createBuild(build: Build): Promise<boolean> {

        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.buildApi.createBuild(build);
        });
        return result?.success ?? false;

    }
}