import { Gpio } from "onoff";

const triggerGPIO = new Gpio(22, "out");
const echoGPIO = new Gpio(23, "in");

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6 / 34321;

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
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
};

watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
  triggerGPIO.writeSync(1);
  setTimeout(() => {
    triggerGPIO.writeSync(0);
  }, 10);
}, 1000);
