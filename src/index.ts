import express from "express";
import bodyParser from "body-parser"
// import { gitWebHookHandler } from "./gitwebhooks";
import { speak }  from "./speak";
import { helloCutiePie } from "./sound";
import { flashEyes } from './gpio';
import path from "path";
import { verify, postImg } from "./slack";
import { githubRequestHandler } from './github-request-handler';

const app = express();

const port = 4567;

app.use(bodyParser.json());

// app.post('/slack', verify);

app.post('/', (req, res) => {
  console.log("!!!!!")
  // gitWebHookHandler(req, res, (err: Error) => {
  //   res.statusCode = 404;
  //   res.end("no such location");
  // });
})

app.get('/', (req, res) => res.send('-= SmartHack Github =-'));

app.post('/github', (req, res) => githubRequestHandler(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const loadImg = () => {
  
  const filePath = path.resolve('src', 'test.png');

  postImg(filePath, "And another image");
}

// loadImg();

const welcome = () => {
  flashEyes(5000);
  speak("Hello I am the smart pension git bot monkey");
}
  
welcome();
