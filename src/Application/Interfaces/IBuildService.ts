import Build from "../../Domain/Entities/Build";

export interface IBuildService {
    createBuild(build: Build): Promise<boolean>;
}