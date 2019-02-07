import "dotenv/config"
import express from "express";
import bodyParser from "body-parser"
import { speak }  from "./speak";
import { helloCutiePie } from "./sound";
import { flashEyes } from './gpio';

import { verify, postImg, sendCameraToSlack } from "./slack";
import { githubRequestHandler } from './github-request-handler';


const app = express();

const port = 4567;

app.use(bodyParser.json());

app.post('/slack', verify);

app.get('/', (req, res) => res.send('-= SmartHack Github =-'));

app.post('/github', (req, res) => githubRequestHandler(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const loadImg = () => {
  
  sendCameraToSlack("A Slack image")
  
}

 loadImg();

const welcome = () => {
  flashEyes(5000);
  speak("Hello I am the smart pension git bot monkey");
}
  
// welcome();
