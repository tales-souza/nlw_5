import express from "express";
import { Express } from "express";
import { settingsRouter } from "./routes/settingsRoutes";
import morgan from 'morgan';
import { usersRouter } from "./routes/usersRoutes";
import { messagesRouter } from "./routes/messagesRoutes";
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
class App {
  public app: Express;

  constructor() {
    this.app = express()
    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "..", "public")));
    this.app.set("views", path.join(__dirname, "..", "public"));
    this.app.engine("html", require("ejs").renderFile);
    this.app.set("view engine", "html");
  }

  routes() {
    this.app.use("/api/v1/settings/", settingsRouter);
    this.app.use("/api/v1/users/", usersRouter);
    this.app.use("/api/v1/messages/", messagesRouter);


  }
}

export default new App().app