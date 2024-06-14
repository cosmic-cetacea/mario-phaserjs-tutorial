import Phaser from "phaser";
import kenney_mini_xml from "/assets/kenney_mini.xml?url";
import tring from '/assets/smb_coin.wav';
import pauseSound from '/assets/smb_pause.wav';
import atlasPng from "/assets/texture.png";
import atlasJson from "/assets/texture.json?url";
import tileSet from "/assets/tile_map.png";
import level00 from "/assets/level00.json?url";


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
    this.load.xml('kenney-mini', kenney_mini_xml);
    this.load.image('tiles', tileSet);
    this.load.tilemapTiledJSON('level00', level00);
  }

  create(){
    this.scene.start("PauseMenu");
    this.scene.start("GameScene");
    this.scene.start("ScoreScene");
  }
}