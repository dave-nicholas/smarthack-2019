import { Gpio } from "onoff";

const monkeyGPIO = new Gpio(4, "out");
const leftEyeGPIO = new Gpio(2, "out");
const rightEyeGPIO = new Gpio(26, "out");

export const monkeyDance = () => {
  monkeyGPIO.writeSync(1);
  setTimeout(() => monkeyGPIO.writeSync(0), 2000);
};

const flashingEyes = () => {
  if (leftEyeGPIO.readSync() === 0) {
    leftEyeGPIO.writeSync(1);
    rightEyeGPIO.writeSync(1);
  } else {
    leftEyeGPIO.writeSync(0);
    rightEyeGPIO.writeSync(0);
  }
};

const alternateFlashEyes = () => {
  if (leftEyeGPIO.readSync() === 0) {
    leftEyeGPIO.writeSync(1);
    rightEyeGPIO.writeSync(0);
  } else {
    leftEyeGPIO.writeSync(0);
    rightEyeGPIO.writeSync(1);
  }
};

export const flashEyes = (time: number, alternate: boolean = false) => {
  const interval = setInterval(
    alternate ? alternateFlashEyes : flashingEyes,
    250
  );
  setTimeout(() => {
    clearInterval(interval);
    leftEyeGPIO.writeSync(0);
    rightEyeGPIO.writeSync(0);
  }, time);
};
