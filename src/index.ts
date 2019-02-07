import express from "express";
import bodyParser from "body-parser"
import { gitWebHookHandler } from "./gitwebhooks";
import { speak }  from "./speak";
import { helloCutiePie } from "./sound";
import { flashEyes } from './gpio';
import path from "path";
import { verify, postImg, sendCameraToSlack } from "./slack";

const app = express();

const port = 4567;

app.use(bodyParser.json());

app.post('/slack', verify);

app.post('/', (req, res) => {
  gitWebHookHandler(req, res, (err: Error) => {
    res.statusCode = 404;
    res.end("no such location");
  });
})

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
