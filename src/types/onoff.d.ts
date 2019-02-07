declare module "onoff" {
  class Gpio {
    constructor(gpio: number, direction: string, edge?: any, options?: any);
    readSync(): number;
    writeSync(state: number): void;
    watch(callback: any): void;
  }
}
