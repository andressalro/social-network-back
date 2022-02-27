import defaultMiddleware from "./default";

export default function registerMiddlewares(server) {
  defaultMiddleware(server);
}