import { Application } from "express";
import ProjectsController from '../controller/ProjectsController';
import UserController from "../controller/UserController"

export const register = (app: Application) => {
  app.get('/ping', (_, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('pong');
  });

  app.get('/users', (req, res) => {
    new UserController().index(req, res);
  });

  app.post('/users', (req, res) => {
    new UserController().createUser(req, res);
  });

  app.get('/users/:id', (req, res) => {
    new UserController().getUser(req, res);
  });

  app.delete('/users/:id', (req, res) =>
    new UserController().deleteUser(req, res)
  );

  app.post('/users/:userId/projects', (req, res) =>
    new UserController().createUserProject(req, res)
  );

  app.get('/users/:userId/projects', (req, res) =>
    new UserController().getUserProjects(req, res)
  );

  app.get('/users/:userId/projects/:projectId', (req, res) =>
    new ProjectsController().getProject(req, res)
  );

  app.delete('/users/:userId/projects/:projectId', (req, res) =>
    new ProjectsController().deleteProject(req, res)
  );
}
