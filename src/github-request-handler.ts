import express from "express";
import { speak } from "./speak";

export const githubRequestHandler = (req: express.Request, res: express.Response) => {
  const repo = req.body.repository;
  const commits = req.body.commits;
  const comment = req.body.comment;

  if (commits && commits.length !== 0 && repo) {
    speak(`User ${commits[0].committer.name} committed to ${repo.name}`);
    console.log('author: ', commits[0].author);
    console.log('committer: ', commits[0].committer.name);
  }

  if (comment && repo) {
    speak(`Repository: ${repo.name} User ${comment.user.login} commented the following ${comment.body}`);
    console.log('comment user: ', comment.user.login);
    console.log('comment: ', comment.body);
  }

  res.send('Github hit');
}
