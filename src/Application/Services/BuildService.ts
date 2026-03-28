import Build from "../../Domain/Entities/Build";
import { IBuildService } from "../Interfaces/IBuildService";
import { IBuildRepository } from "../Repositories/IBuildRepository";

export class BuildService implements IBuildService {

    buildRepository: IBuildRepository;

    constructor(buildRepository: IBuildRepository) {
        this.buildRepository = buildRepository;
    }
    getBuild(buildId: string): Promise<Build> {
        return this.buildRepository.getBuild(buildId);
    }
    updateBuild(build: Build): Promise<boolean> {
        return this.buildRepository.updateBuild(build);
    }
    deleteBuild(buildId: string): Promise<boolean> {
        return this.buildRepository.deleteBuild(buildId);
    }
    listBuilds(): Promise<Build[]> {
        return this.buildRepository.listBuilds();
    }

    createBuild(build: Build): Promise<boolean> {
        return this.buildRepository.createBuild(build);
    }
}