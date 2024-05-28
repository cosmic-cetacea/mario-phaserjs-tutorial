import CobaScene from "./CobaScene";

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
	scene: [CobaScene]
};
