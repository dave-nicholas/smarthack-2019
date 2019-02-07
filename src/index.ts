import express from "express";
import bodyParser from "body-parser"
import { gitWebHookHandler } from "./gitwebhooks";
import { speak }  from "./speak";
import { helloCutiePie } from "./sound";
import { flashEyes } from './gpio';

const app = express();

const port = 4567;

app.use(bodyParser.json());

app.post('/slack', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body)
  res.send(JSON.stringify({"challenge":req.body.challenge}));
});

app.post('/', (req, res) => {
  console.log("!!!!!")
  gitWebHookHandler(req, res, (err: Error) => {
    res.statusCode = 404;
    res.end("no such location");
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const welcome = () => {
  flashEyes(5000);
  speak("Hello I am the smart pension git bot monkey");
}
  
welcome();

