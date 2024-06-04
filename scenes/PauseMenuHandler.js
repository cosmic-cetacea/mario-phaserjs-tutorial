import Phaser from 'phaser';
import evn from './EventCenter';

export default class PauseMenuHandler extends Phaser.Scene {
  constructor(){
    super({
      key: "PauseMenu",
    });
  }

  create(){
    Phaser.GameObjects.BitmapText.ParseFromAtlas(this, 'kenney-font', 'atlas', 'kenney_mini.png', 'kenney-mini');
    this.pausedText = this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height / 4, "kenney-font", "Game Paused", 36);
    this.pausedText.setTintFill(0xFBF9F1);
    this.pausedText.setOrigin(0.5);
    this.pausedText.setVisible(false);
    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.escapeKey.on('down', () => {
      evn.emit("PAUSE", this.pausedText);
    });
  }

}
