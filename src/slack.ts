import express from "express";
import fs from "fs";
import { WebClient } from '@slack/client';

const token = process.env.SLACK_API_TOKEN;
const channels = process.env.SLACK_CHANNELS;

const web = new WebClient(token);

export const verify = (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({"challenge":req.body.challenge}));

  if(req.body.event.type = "app_mention") {
    console.log(req.body.event.text.replace(/<.*>/, ''));
  }
}

export const postImg = (filePath: string, title: string) => {
  const file = fs.createReadStream(filePath);

  web.files.upload({ file, channels, title })
    .then((response) => {
      console.log(`File uploaded as Stream`);
    })
    .catch((error) => {
      console.log('File upload as Stream error:');
      console.log(error);
    });
}