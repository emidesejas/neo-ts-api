import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as router from "./routes"

import "reflect-metadata";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(session(
  {
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  }
  ));

app.use(cookieParser());

app.use(logger('dev'));

router.register(app);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${ port }`);
});
