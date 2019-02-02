const Gpio = require("onoff").Gpio;
const ledIO = new Gpio(2, "out");
const monkeyIO = new Gpio(4, "out");

ledIO.writeSync(1);
monkeyIO.writeSync(1);
console.log(' :on');

setTimeout(() => {
  ledIO.writeSync(0);
  monkeyIO.writeSync(0);
  console.log(' :off')
}, 3000);
