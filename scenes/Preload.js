import Phaser from "phaser";
import kenney_mini_xml from "/assets/kenney_mini.xml?url";
import tring from '/assets/smb_coin.wav';
import pauseSound from '/assets/smb_pause.wav';
import jumpSound from '/assets/smb_jump-small.wav';
import atlasPng from "/assets/texture.png";
import atlasJson from "/assets/texture.json?url";
import tileSet from "/assets/env_tile.png";
import world from "/assets/world.json?url";


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
    this.load.xml('kenney-mini', kenney_mini_xml);
    this.load.image('tiles', tileSet);
    this.load.tilemapTiledJSON('world', world);
  }

  create(){
    this.scene.start("PauseMenu");
    this.scene.start("GameScene");
    this.scene.start("ScoreScene");
  }
}
