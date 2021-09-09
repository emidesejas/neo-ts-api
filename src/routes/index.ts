import { Application } from "express";
import UserController from "../controller/UserController"

export const register = (app: Application) => {
  app.get('/ping', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('pong');
  });

  app.get('/users', async (req, res) => {
    new UserController().index(req, res);
  });

  app.post('/users', async (req, res) => {
    new UserController().createUser(req, res);
  });

  app.get('/users/:id', async (req, res) => {
    new UserController().getUser(req, res);
  });
}
