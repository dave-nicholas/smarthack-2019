import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { speak } from "./speak";
import { helloCutiePie } from "./sound";
import { flashEyes } from "./gpio";

import { verify, postImg, sendCameraToSlack, photo, dance } from "./slack";
import { githubRequestHandler } from "./github-request-handler";
import { watchSensor } from "./ultrasonic-sensor";

const app = express();

const port = 4567;

app.use(bodyParser.json());

app.post("/slack", verify);
app.post("/photo", photo);
app.post("/dance", dance);

app.get("/", (req, res) => res.send("-= SmartHack Github =-"));

app.post("/github", (req, res) => githubRequestHandler(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const loadImg = () => {
  sendCameraToSlack("A Slack image");
};

//loadImg();

const welcome = () => {
  flashEyes(5000);
  speak("Hello everyone I am the smart pension git bot monkey");
};

setTimeout(() => watchSensor(), 10000);

welcome();
