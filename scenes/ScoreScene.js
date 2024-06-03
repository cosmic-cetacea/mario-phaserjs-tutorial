import Phaser from "phaser";
import kenney_mini_png from "/assets/kenney_mini.png";
import kenney_mini_xml from "/assets/kenney_mini.xml?url";
import evn from "./EventCenter";

export default class ScoreScene extends Phaser.Scene {
  constructor(){
    super({
      key: "ScoreScene",
      active: true,
    });
  }

  preload(){
    this.load.bitmapFont('kenney-mini', kenney_mini_png, kenney_mini_xml);
  }

  create(){
    this.score = 0;
    this.scoreText = this.add.bitmapText(20, 20, 'kenney-mini', "Score: 0", 24);
    this.scoreText.setScrollFactor(0);
    evn.on('ADD-SCORE', this.addScore, this);
  }

  addScore(){
    this.score += 100;
    this.scoreText.setText(`Score: ${this.score}`);
  }

}
