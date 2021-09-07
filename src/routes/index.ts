import { Application } from "express";

export const register = (app: Application) => {
  app.get('/ping', (req: any, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('pong');
  });
}
