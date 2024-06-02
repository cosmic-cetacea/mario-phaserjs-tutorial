import CobaScene from "./CobaScene";
import PauseMenuHandler from "./PauseMenuHandler";
import Phaser from "phaser";

export default {
	width: 640,
	height: 360,
  backgroundColor: '#6AD4DD',
	physics: {
		default: 'arcade',
		arcade: {
      gravity: {y: 300},
			debug: false
		}
	},
	title: "Super Mario pakai phaserjs",
	scene: [CobaScene, PauseMenuHandler],
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
  },
};
