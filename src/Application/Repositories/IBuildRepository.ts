import Build from "../../Domain/Entities/Build";

export interface IBuildRepository {
    createBuild(build: Build): Promise<boolean>;
}