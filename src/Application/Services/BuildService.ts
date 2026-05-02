import Build from "../../Domain/Entities/Build";
import { IBuildService } from "../Interfaces/IBuildService";
import { IBuildRepository } from "../Repositories/IBuildRepository";
import { IUserRepository } from "../Repositories/IUserRepository";

export class BuildService implements IBuildService {

    buildRepository: IBuildRepository;
    usersRepository: IUserRepository;

    constructor(buildRepository: IBuildRepository, usersRepository: IUserRepository) {
        this.buildRepository = buildRepository;
        this.usersRepository = usersRepository;
    }

    async getBuild(buildId: string): Promise<Build> {
        let build = await this.buildRepository.getBuild(buildId);
        let userIds = build.updatedBy ? [build.updatedBy] : [];
        let users = await this.usersRepository.ListUsersByIds(userIds);

        if (users.length > 0) {
            let user = users[0];
            build.updatedBy = user.username;
        }

        return build;
    }

    updateBuild(build: Build): Promise<boolean> {
        return this.buildRepository.updateBuild(build);
    }

    deleteBuild(buildId: string): Promise<boolean> {
        return this.buildRepository.deleteBuild(buildId);
    }

    async listBuilds(): Promise<Build[]> {
        let builds = await this.buildRepository.listBuilds();

        let userIds = builds.map(b => b.updatedBy).filter(id => id !== null) as string[];
        let users = await this.usersRepository.ListUsersByIds(userIds);
        
        builds.forEach(build => {
            let user = users.find(u => u.id === build.updatedBy);
            if (user) {
                build.updatedBy = user.username;
            }
        });

        return builds;
    }

    createBuild(build: Build): Promise<boolean> {
        return this.buildRepository.createBuild(build);
    }
}