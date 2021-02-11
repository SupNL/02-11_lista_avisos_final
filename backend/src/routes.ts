import { Router } from 'express';
import multer from 'multer';

import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import AuthenticationController from './controllers/AuthenticationController';
import uploadConfig from './config/upload';

import authentication from "./middlewares/authentication";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/users", authentication.validate, UserController.index);
routes.get("/users/:id", authentication.validate, UserController.show);
routes.post("/users", UserController.create); // nao precisa de autenticacao para criar um usuario

routes.get("/posts", authentication.validate, PostController.index);
routes.get("/posts/:id", authentication.validate, PostController.show);
routes.post("/posts", authentication.validate, upload.array("images"), PostController.create);
routes.put("/posts/:id", authentication.validate, PostController.update);
routes.delete("/posts/:id", authentication.validate, PostController.remove);

routes.post("/login", AuthenticationController.login);

export default routes;