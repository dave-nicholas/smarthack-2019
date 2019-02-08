import express from "express";
import fs from "fs";
import { WebClient } from '@slack/client';
import { flashEyes } from './gpio';
import { speak }  from "./speak";
import { Raspistill } from "node-raspistill";
import { monkeyDance } from "./gpio";

const camera = new Raspistill();

const token = process.env.SLACK_API_TOKEN;
const channels = process.env.SLACK_CHANNELS;

const web = new WebClient(token);

export const verify = (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({"challenge":req.body.challenge}));

  if(req.body.event.type = "app_mention") {
    console.log(req.body.event.text.replace(/<.*>/, ''));
    flashEyes(5000);
    speak(req.body.event.text.replace(/<.*>/, ''));
  }
}

export const photo = (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send()
  sendCameraToSlack("Slack photo")
}

export const dance = (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send()
  monkeyDance();
}

export const sendCameraToSlack = (message: string) => {
  camera.takePhoto('photo').then((photo) => {
    postImg(photo, message)
  })
}

export const postImg = (file: any, title: string) => {

  web.files.upload({ file, channels, title })
    .then((response) => {
      console.log(`File uploaded as Stream`);
    })
    .catch((error: any) => {
      console.log('File upload as Stream error:');
      console.log(error);
    });
}
