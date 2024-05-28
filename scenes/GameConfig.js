import CobaScene from "./CobaScene";

export default {
	width: 800,
	height: 600,
  backgroundColor: '#41C9E2',
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
