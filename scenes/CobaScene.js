import Phaser from 'phaser';
import awan from '/assets/cloud.png';
import mario from '/assets/mario_spritesheet.png';
import tanah from '/assets/ground-long.png';


export default class CobaScene extends Phaser.Scene {
  constructor(){
    super({key: "CobaScene"});
  }

  preload(){
    this.load.image('awan', awan);
    this.load.image('tanah', tanah);
    this.load.spritesheet('mario', mario, {frameWidth: 16, frameHeight: 32});
  }

  create(){
    this.awan1 = this.add.image(100, 100, 'awan');
    this.awan2 = this.add.image(200, 50, 'awan');
    this.awan3 = this.add.image(300, 70, 'awan');
    this.awan4 = this.add.image(400, 100, 'awan');

    this.tanah = this.physics.add.staticGroup();
    this.tanah.create(100, 300, 'tanah');

    this.player = this.physics.add.sprite(150, 100, 'mario', 0);
    this.anims.create({
      key: 'kanan',
      frames: this.anims.generateFrameNumbers('mario', {start: 2, end: 4}),
      repeat: -1,
      frameRate: 10,

    });

    this.anims.create({
      key: 'stop',
      frames: [{key: 'mario', frame: 0}],
      frameRate: 10,
    });

    this.keyboard = this.input.keyboard.createCursorKeys();


    this.physics.add.collider(this.player, this.tanah);
  }

  update(){
    if (this.keyboard.right.isDown){
      this.player.anims.play('kanan', true);
      this.player.setVelocityX(100);
    }
    else if (this.keyboard.left.isDown){
      this.player.setFlipX(true);
      this.player.setVelocityX(-100);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('stop');
    }

  }
}
