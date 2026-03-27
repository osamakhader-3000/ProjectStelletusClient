import Build from "../../../Domain/Entities/Build";
import { GeneralApiResult } from "../../DataTransferObjects/GeneralApiResult";

export interface IBuildApi {
    createBuild(build: Build): Promise<GeneralApiResult<boolean>>;
}