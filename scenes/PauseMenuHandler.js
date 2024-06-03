import Phaser from 'phaser';
import evn from './EventCenter';

export default class PauseMenuHandler extends Phaser.Scene {
  constructor(){
    super({
      key: "PauseMenu",
      active: true,
    });
  }

  create(){
    this.pausedText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "Paused", {fontSize: '24px'});
    this.pausedText.setOrigin(0.5);
    this.pausedText.setVisible(false);
    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.escapeKey.on('down', () => {
      evn.emit("PAUSE", this.pausedText);
    });
  }

}
