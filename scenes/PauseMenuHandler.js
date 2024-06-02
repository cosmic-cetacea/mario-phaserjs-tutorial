import Phaser from 'phaser';
import ee from './EventCenter';

export default class PauseMenuHandler extends Phaser.Scene {
  constructor(){
    super({
      key: "PauseMenu",
      active: true,
    });
  }

  create(){
    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.escapeKey.on('down', () => {
      ee.emit("PAUSE");
    });
    // this.escapeKey.on('down', () => {
    //   if (this.scene.isPaused("CobaScene")) {
    //     this.scene.get("CobaScene").scene.resume();
    //   }
    //   else {
    //     this.scene.get("CobaScene").scene.pause();
    //     
    //   }
    // });
  }

  // update(){
  //   if (this.escapeKey.isDown) {
  //     ee.emit("PAUSE");
  //   }
  // }

}
