import "./config/environment.config";
import "./config/passport.config";

import 'module-alias/register';


import App from "./app";
import express from "express";
import cors from "cors";

import passport from "passport";

import { LoggerMiddleware } from "./middlewares";
import { AuthController } from "./controllers";


const app = new App({
    port: parseInt(process.env.PORT as string),

    controllers: [new AuthController()],
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        LoggerMiddleware,
        passport.initialize(),
        cors(),
    ],
});

app.listen();
