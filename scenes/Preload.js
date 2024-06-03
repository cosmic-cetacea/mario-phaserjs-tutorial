import Phaser from "phaser";
import kenney_mini_png from "/assets/kenney_mini.png";
import kenney_mini_xml from "/assets/kenney_mini.xml?url";
import awan from '/assets/cloud.png';
import mario from '/assets/mario_spritesheet.png';
import tanah from '/assets/ground-long.png';
import koin from '/assets/coin.png';
import tring from '/assets/smb_coin.wav';
import pauseSound from '/assets/smb_pause.wav';


export default class Preload extends Phaser.Scene {
  constructor(){
    super({
      key: "Preload"
    });
  }

  preload(){
    this.load.image('awan', awan);
    this.load.image('tanah', tanah);
    this.load.spritesheet('mario', mario, {frameWidth: 16, frameHeight: 32});
    this.load.image('koin', koin);
    this.load.audio('tring', tring);
    this.load.audio('pause-sound', pauseSound);
    this.load.bitmapFont('kenney-mini', kenney_mini_png, kenney_mini_xml);
  }

  create(){
    this.scene.start("PauseMenu");
    this.scene.start("GameScene");
    this.scene.start("ScoreScene");
  }
}
