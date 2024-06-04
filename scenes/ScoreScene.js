import Phaser from "phaser";
import evn from "./EventCenter";

export default class ScoreScene extends Phaser.Scene {
  constructor(){
    super({
      key: "ScoreScene",
    });
  }


  create(){
    Phaser.GameObjects.BitmapText.ParseFromAtlas(this, 'kenney-font', 'atlas', 'kenney_mini.png', 'kenney-mini');
    this.score = 0;
    this.scoreText = this.add.bitmapText(20, 20, 'kenney-font', "Score: 0", 24);
    this.scoreText.setTintFill(0xffffff);
    this.scoreText.setScrollFactor(0);
    evn.on('ADD-SCORE', this.addScore, this);
  }

  addScore(){
    this.score += 100;
    this.scoreText.setText(`Score: ${this.score}`);
  }

}
