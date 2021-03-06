import express from "express";
import { speak } from "./speak";
import "dotenv/config";
import { flashEyes } from "./gpio";
import crypto from "crypto";

const EVENT_PUSH = "push";
const EVENT_COMMIT_COMMENT = "commit_comment";
const EVENT_ISSUES = "issues";

const handlePushEvent = (ref: string, commits: Array<any>, repo: any) => {
  if (commits && commits.length !== 0 && repo) {
    const headArray = ref.split("/");
    const isMaster = headArray[headArray.length - 1] === "master";
    if (isMaster) {
      speak(
        `${commits[0].committer.name} is trying to break the internet by pushing code to ${repo.name}`
      );
      flashEyes(5000);
      console.log("author: ", commits[0].author);
      console.log("committer: ", commits[0].committer.name);
    }
  }
};

const handleCommitComment = (comment: any, repo: any) => {
  if (comment && repo) {
    speak(
      `User ${comment.user.login} is sticking their nose in again on ${
        repo.name
      } ${comment.path}`
    );
    flashEyes(5000, true);
    console.log("comment user: ", comment.user.login);
    console.log("comment: ", comment.body);
  }
};

const handleIssue = (issue: any) => {
  if (issue) {
    speak(
      `instead of minding his own business ${issue.issue.user.login} has ${issue.action} an issue ${
        issue.issue.title
      }`
    );
    flashEyes(5000);
    console.log("issue action: ", issue.action);
    console.log("issue title: ", issue.issue.title);
    console.log("issue user: ", issue.issue.user.login);
  }
};

const createComparisonSignature = (body: any) => {
  const hmac = crypto.createHmac('sha1', process.env.GIT_WEBHOOK_SECRET || "");
  const self_signature = hmac.update(JSON.stringify(body)).digest('hex');
  return `sha1=${self_signature}`; // shape in GitHub header
}

const compareSignatures = (signature: string, comparison_signature: string) => {
  const source = Buffer.from(signature);
  const comparison = Buffer.from(comparison_signature);
  return crypto.timingSafeEqual(source, comparison); // constant time comparison
}


export const githubRequestHandler = (
  req: express.Request,
  res: express.Response
) => {
  const repo = req.body.repository;
  const refHead = req.body.ref;
  const commits = req.body.commits;
  const comment = req.body.comment;
  const issue = req.body;
  const githubEvent = req.headers["x-github-event"];
  const signature = req.headers['x-hub-signature'] || "";
  const comparison_signature = createComparisonSignature(req.body);
  
  const sigToCompare = typeof signature !== "string" ? "" : signature;

  if (!compareSignatures(sigToCompare, comparison_signature)) {
    return res.status(401).send('Mismatched signatures');
  }

  switch (githubEvent) {
    case EVENT_PUSH: {
      handlePushEvent(refHead, commits, repo);
      break;
    }

    case EVENT_COMMIT_COMMENT: {
      handleCommitComment(comment, repo);
      break;
    }

    case EVENT_ISSUES: {
      handleIssue(issue);
      break;
    }

    default: {
      console.log("Invalid event!");
      break;
    }
  }

  res.send("Github hit");
};
