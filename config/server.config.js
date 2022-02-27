import Express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import basicAuth from "express-basic-auth";
import { MongoDao } from "./db";
import { fakeContacts } from "../utils";
import { ConfigService } from "./config-service";
import { connectDb } from "./db.config";

export class ServerConfig {
    #userAccounts = {
        admin: "supersecret2"
    };

    constructor({ port, middlewares, routers}) {
        this.app = Express();
        this.app.set("env", process.env.NODE_ENV);
        this.app.set("port", port);
        this.registerCORSMiddleware()
            .registerHelmetMiddleware()
            .registerBasicAuthMiddleware()
            .registerJSONMiddleware();
        
        middlewares && middlewares.forEach(elMiddleware => {
            this.registerMiddleware(elMiddleware);
        });

        this.app.get("/", (req, res, next) => {
            res.json({
                message: "Server working"
            });
        });

        routers && routers.forEach(({ baseUrl, router }) => {
            this.registerRouter(baseUrl, router);
        });

        this.registerMiddleware(
            function(req, res, next) {
                var err = new Error("Not Found");
                err.statusCode = 404;
                next(err);
            }
        );
        this.registerErrorHandlingMiddleware();
    }

    get port() {
        return this.app.get("port");
    }

    set port(number) {
        this.app.set("port", number);
    }
    
    registerMiddleware(middleware) {
        this.app.use(middleware);
        return this;
    }

    registerRouter(baseUrl, router) {
        this.app.use(baseUrl, router);
        return this;
    }

    registerJSONMiddleware() {
        this.registerMiddleware(Express.json());
        return this;
    }

    registerCORSMiddleware() {
        this.registerMiddleware(cors());
        return this;
    }

    registerHelmetMiddleware() {
        this.app.use(helmet());
        return this;
    }

    registerBasicAuthMiddleware() {
        this.registerMiddleware(
            basicAuth({
                users: this.#userAccounts,
                challenge: true
            })
        );
        return this;
    }

    registerErrorHandlingMiddleware() {
        this.app.get("env") === "development" ? 
            this.registerMiddleware(
                ({ statusCode = 500, message, stack }, req, res, next) => {
                    res.status(statusCode);
                    res.json({
                        statusCode,
                        message,
                        stack
                    });
                }
            )
        : this.registerMiddleware(({ statusCode, message }, req, res, next) => {
            res.status(statusCode);
            res.json({ statusCode, message });
        });
        return this;
    }

    async listen() {
        try {
            await connectDb();
            this.app.listen(this.port, () => {
                console.log(`Listening on port: ${this.port}`);
            });
        } catch (error) {
            console.error(`Error DB: ${error.message}`)
        }
    }
}