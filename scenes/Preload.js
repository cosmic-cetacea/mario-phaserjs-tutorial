import Phaser from "phaser";
import kenney_mini_xml from "/assets/kenney_mini.xml?url";
import tring from '/assets/smb_coin.wav';
import pauseSound from '/assets/smb_pause.wav';
import jumpSound from '/assets/smb_jump-small.wav';
import getPizzaSound from "/assets/smb_1-up.wav";
import dieSound from '/assets/smb_mariodie.wav';
import atlasPng from "/assets/char_sprites.png";
import atlasJson from "/assets/char_sprites.json?url";
import tileSet from "/assets/env_tile.png";
import world from "/assets/world.json?url";
import pizza from "/assets/pizza.png";


export default class Preload extends Phaser.Scene {
  constructor(){
    super({
      key: "Preload"
    });
  }

  preload(){
    this.load.atlas('atlas', atlasPng, atlasJson);
    this.load.audio('tring', tring);
    this.load.audio('pause-sound', pauseSound);
    this.load.audio('jump-sound', jumpSound);
    this.load.audio('die-sound', dieSound);
    this.load.audio('getPizza-sound', getPizzaSound);
    this.load.xml('kenney-mini', kenney_mini_xml);
    this.load.image('tiles', tileSet);
    this.load.tilemapTiledJSON('world', world);
    this.load.spritesheet('pizza', pizza, {frameWidth: 16, frameHeight: 16});
  }

  create(){
    this.scene.start("PauseMenu");
    this.scene.start("GameScene");
    this.scene.start("ScoreScene");
  }
}
