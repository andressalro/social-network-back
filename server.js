import { ServerConfig } from "./config";
import { routerV2, routerV1, redirectRouter, authRouter } from "./routes";

async function main() {
    const PORT = process.env.PORT || 3000;
    const server = new ServerConfig({
        port: PORT,
        //middleware: []
        routers: [redirectRouter, routerV2, routerV1, authRouter]
    });
  server.listen();
}

main();