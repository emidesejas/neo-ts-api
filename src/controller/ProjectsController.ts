import Project from '../entity/Project';
import { getManager, Repository } from 'typeorm';
import { Request, Response } from 'express';

export default class ProjectsController {
  repo: Repository<Project>;

  constructor() {
    this.repo = getManager().getRepository(Project);
  }

  async getProject(req: Request, res: Response) {
    const {
      userId,
      projectId
    } = req.params;

    const project = await this.repo.findOne({ id: parseInt(projectId, 10) }, {
      relations: ['owner']
    });

    if (!project || (userId && project.owner.id !== parseInt(userId, 10))) {
      res.status(400).send();
      return
    }

    res.send(project);
  }

  async deleteProject(req: Request, res: Response) {
    const {
      userId,
      projectId
    } = req.params;

    const project = await this.repo.findOne({ id: parseInt(projectId, 10) }, {
      relations: ['owner']
    });

    if (!project && (!userId || project.owner.id === parseInt(projectId, 10))) {
      res.status(400).send();
      return
    }

    res.send(await this.repo.remove(project));
  }
}
