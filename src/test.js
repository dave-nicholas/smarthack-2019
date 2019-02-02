import { Gpio } from "onoff";
const ledIO = new Gpio(17, "out");
const monkeyIO = new Gpio(4, "out");

ledIO.writeSync(1);
monkeyIO.writeSync(1);

setTimeout(() => {
  ledIO.writeSync(0);
  monkeyIO.writeSync(0);
}, 3000);
