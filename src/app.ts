import express from "express";
import {Express} from "express";
import { settingsRouter } from "./routes/settingsRoutes";
import morgan from 'morgan';
import { usersRouter } from "./routes/usersRoutes";

class App{
  public app : Express ;

  constructor (){
    this.app = express()
    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/v1/settings/", settingsRouter);
    this.app.use("/api/v1/users/", usersRouter);

  }
}

export default new App().app