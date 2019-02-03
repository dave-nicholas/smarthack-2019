import * as http from "http";
import createHandler from "github-webhook-handler";
import "dotenv/config";

import { monkeyDance, flashEyes } from "./gpio";
import { mushMuscle } from "./sound";

console.log("gh secret:", process.env.GIT_WEBHOOK_SECRET);

const handler = createHandler({
  path: "/webhook",
  secret: process.env.GIT_WEBHOOK_SECRET || ""
});

http
  .createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    handler(req, res, (err: Error) => {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(4567);

handler.on("error", function(err) {
  console.error("Error:", err.message);
});

handler.on("push", function(event) {
  monkeyDance();
  flashEyes(10000);
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );
});

handler.on("issues", function(event) {
  monkeyDance();
  mushMuscle.play();
  flashEyes(25000);
  console.log(
    "Received an issue event for %s action=%s: #%d %s",
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
});
