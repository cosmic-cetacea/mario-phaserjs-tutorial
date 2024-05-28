import Phaser from 'phaser';

export default class CobaScene extends Phaser.Scene {
  constructor(){
    super({key: "CobaScene"});
  }

  create(){
    console.log("Scene kosong");
  }
}
