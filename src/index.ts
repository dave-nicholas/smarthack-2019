import * as http from "http";
import { gitWebHookHandler } from "./gitwebhooks";
import { speak }  from "./speak";
import { helloCutiePie } from "./sound";

http
  .createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    gitWebHookHandler(req, res, (err: Error) => {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(4567);


const welcome = () => {
  helloCutiePie.play();
  speak("Hello everyone, I am the smart pension git bot Monkey..... oh yes baby!");
};

welcome();
