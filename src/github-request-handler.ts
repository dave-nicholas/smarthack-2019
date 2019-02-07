import express from "express";
import { speak } from "./speak";

const EVENT_PUSH = 'push';
const EVENT_COMMIT_COMMENT = 'commit_comment';
const EVENT_ISSUES = 'issues';

const handlePushEvent = (ref: string, commits: Array<any>, repo: any) => {
  if (commits && commits.length !== 0 && repo) {
    const headArray = ref.split('/');
    const isMaster = headArray[headArray.length - 1] === 'master';
    if (isMaster) {
      speak(`User ${commits[0].committer.name} committed to ${repo.name}`);
      console.log('author: ', commits[0].author);
      console.log('committer: ', commits[0].committer.name);
    }
  }
}

const handleCommitComment = (comment: any, repo: any) => {
  if (comment && repo) {
    speak(`Repository ${repo.name} User ${comment.user.login} commented on ${comment.path}`);
    console.log('comment user: ', comment.user.login);
    console.log('comment: ', comment.body);
  }
}

const handleIssue = (issue: any) => {
  if (issue) {
    speak(`User ${issue.issue.user.login} initiated ${issue.action} with title ${issue.issue.title}`);
    console.log('issue action: ', issue.action);
    console.log('issue title: ', issue.issue.title);
    console.log('issue user: ', issue.issue.user.login);
  }
}

export const githubRequestHandler = (req: express.Request, res: express.Response) => {
  const repo = req.body.repository;
  const refHead = req.body.ref;
  const commits = req.body.commits;
  const comment = req.body.comment;
  const issue = req.body;
  const githubEvent = req.headers['x-github-event'];

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
      console.log('Invalid event!');
      break;
    }
  }

  res.send('Github hit');
}
