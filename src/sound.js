const { createAudio } = require('node-mp3-player');
const Audio = createAudio();

const file = Audio('./assets/lie.mp3');

file.play();
