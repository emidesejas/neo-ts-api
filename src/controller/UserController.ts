import { Request } from "express";
import { Response } from "express";
import Project from '../entity/Project';
import { getManager, Repository } from "typeorm"
import User from "../entity/User";

export default class UserController {
  repo: Repository<User>;
  projectsRepo: Repository<Project>;

  constructor () {
    this.repo = getManager().getRepository(User);
    this.projectsRepo = getManager().getRepository(Project);
  }

  async index(req: Request, res: Response) {
    res.send(await this.repo.find({ select: ['id', 'firstName', 'lastName', 'email'] }));
  }

  async createUser(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).send();
      return;
    }

    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    await this.repo.save(user);
    res.send(user);
  }

  async getUser(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).send();
      return;
    }

    res.send(await this.repo.findOne({ id: parseInt(req.params.id, 10) }, { relations: ['projects'] }));
  }

  async deleteUser(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).send();
      return;
    }

    const user = await this.repo.findOne({ id: parseInt(req.params.id, 10) });
    if (user) {
      this.repo.remove(user);
      res.send(200);
    } else {
      res.send(400);
    }
  }

  async createUserProject(req: Request, res: Response) {
    const owner = await this.repo.findOne({ id: parseInt(req.params.userId, 10) })

    if (!req.params.userId || !req.body.name || !owner) {
      res.status(400).send();
      return;
    }

    const {
      name,
      description
    } = req.body;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.owner = owner;

    await this.projectsRepo.save(project);
    res.send(project);
  }

  async getUserProjects(req: Request, res: Response) {
    const {
      userId
    } = req.params;

    const owner = await this.repo.findOne({ id: parseInt(userId, 10) }, { relations: ['projects'] });

    if (!owner) {
      res.status(400).send();
      return;
    }

    res.send(owner.projects);
  }
}
