import express from "express";
import mongoose from "mongoose";
import { Application } from "express";

class App {
    public app: Application;
    private port: number;
    constructor(appInit: { port: number; middlewares: any; controllers: any }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middlewares);
        this.routes(appInit.controllers);
        this.assets();
        this.databaseConnection();
    }

    private middlewares(middlewares: {
        forEach: (mw: (middleWare: any) => void) => void;
    }) {
        middlewares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: {
        forEach: (ctrl: (controller: any) => void) => void;
    }) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    private async databaseConnection() {
        await mongoose.connect(<string>process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

    private assets() {
        this.app.use(express.static("public"));
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}

export default App;
