import { Gpio } from "onoff";
import { speak } from "./speak";
import { flashEyes } from "./gpio";

const triggerGPIO = new Gpio(22, "out");
const echoGPIO = new Gpio(23, "in", "both");

const threshold: number = 128;

triggerGPIO.writeSync(0);

const watchHCSR04 = () => {
  let startTick: number;

  echoGPIO.watch((err: string, value: any) => {
    if (err) {
      throw err;
    }
    if (value == 1) {
      startTick = Date.now();
    } else {
      const endTick = Date.now();
      const delta = endTick - startTick;
      //console.log(delta);
      if (delta < threshold) {
        // console.log("too close");
        flashEyes(1000, true);
        speak("get lost");
      }
    }
  });
};

export const watchSensor = () => {
  watchHCSR04();

  // Trigger a distance measurement once per second
  setInterval(() => {
    triggerGPIO.writeSync(1);
    setTimeout(() => {
      triggerGPIO.writeSync(0);
    }, 10);
  }, 1000);
};
