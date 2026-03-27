import Build from "../../Domain/Entities/Build";
import { IBuildService } from "../Interfaces/IBuildService";
import { IBuildRepository } from "../Repositories/IBuildRepository";

export class BuildService implements IBuildService {

    buildRepository: IBuildRepository;

    constructor(buildRepository: IBuildRepository) {
        this.buildRepository = buildRepository;
    }

    createBuild(build: Build): Promise<boolean> {
        return this.buildRepository.createBuild(build);
    }
}