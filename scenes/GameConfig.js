import Preload from "./Preload";
import GameScene from "./GameScene";
import PauseMenuHandler from "./PauseMenuHandler";
import ScoreScene from "./ScoreScene";
// import Phaser from "phaser";

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
	title: "PhaserJS Super Mario Clone By Cosmic Cetacea / Pratama",
	scene: [Preload, GameScene , PauseMenuHandler, ScoreScene],
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
  },
};
