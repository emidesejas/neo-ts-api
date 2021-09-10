import { Request } from "express";
import { Response } from "express";
import { getManager, Repository } from "typeorm"
import User from "../entity/User";

export default class UserController {

  repo: Repository<User>;

  constructor () {
    this.repo = getManager().getRepository(User);
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
    res.send(this.userData(user));
  }

  async getUser(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).send();
      return;
    }

    res.send(
      this.userData(
        await this.repo.findOne({ id: parseInt(req.params.id, 10) })
      )
    );
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

  private userData (user: User) {
    const { password, ...userData } = user;
    return userData;
  }
}
