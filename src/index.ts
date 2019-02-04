import * as http from "http";
import { gitWebHookHandler } from "./gitwebhooks";

http
  .createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    gitWebHookHandler(req, res, (err: Error) => {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(4567);
