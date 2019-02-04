import { exec } from "child_process";

/*
aplay /usr/share/sounds/alsa/*
sudo apt-get install espeak
*/

export const speak = (somethingToSay: string) =>
  exec(`espeak -ven-us -s165 -g12 "${somethingToSay}" 2>/dev/null`);
