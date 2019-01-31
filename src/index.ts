import * as http from "http";
import createHandler from "github-webhook-handler";
import { Gpio } from "onoff";

const gpio4 = new Gpio(4, "out");

const makeMonkeyDance = () => {
  if (gpio4.readSync() === 0) { gpio4.writeSync(1); }
};

const handler = createHandler({ path: "/webhook", secret: "myhashsecret" });

http
  .createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    handler(req, res, (err: Error) => {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(4567);

handler.on("error", function (err) {
  console.error("Error:", err.message);
});

handler.on("push", function (event) {
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );
});

handler.on("issues", function (event) {
  makeMonkeyDance();
  console.log(
    "Received an issue event for %s action=%s: #%d %s",
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
});
