import createHandler from "github-webhook-handler";
import "dotenv/config";

import { monkeyDance, flashEyes } from "./gpio";
import { mushMuscle, vote, questions } from "./sound";
import { speak } from "./speak";

export const gitWebHookHandler = createHandler({
  path: "/webhook",
  secret: process.env.GIT_WEBHOOK_SECRET || ""
});

gitWebHookHandler.on("error", err => console.error("Error:", err.message));

const playVote = () => {
  flashEyes(5000);
  vote.play();
};

gitWebHookHandler.on("pull_request_review", event => playVote());
gitWebHookHandler.on("pull_request_review_comment", event => playVote());

gitWebHookHandler.on("push", async event => {
  await mushMuscle.play();
  monkeyDance();
  flashEyes(10000);
});

gitWebHookHandler.on("issues", async event => {
  await questions.play();
  // monkeyDance();
  speak(event.payload.issue.title);
  flashEyes(25000);
  console.log(
    "Received an issue event for %s action=%s: #%d %s",
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
});
