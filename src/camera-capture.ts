import { exec } from "child_process";

export const cameraCapture = (imageName: string) =>
  exec(`raspistill -o ../../${imageName}.jpg`);
