declare module "node-mp3-player" {
  const createAudio: () => (filename: string) => { play: () => void };
}
