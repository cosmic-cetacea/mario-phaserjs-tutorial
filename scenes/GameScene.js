import Phaser from 'phaser';
import evn from './EventCenter';

export default class GameScene extends Phaser.Scene {
  constructor(){
    super({key: "GameScene"});
  }

  create(){
    const map = this.make.tilemap({key: 'world'});
    const tiles = map.addTilesetImage('env_tile', 'tiles');
    const water_layer = map.createLayer('water', tiles, 0, 0);
    const vegetation_layer = map.createLayer('vegetation', tiles, 0, 0);
    const platform_layer = map.createLayer('platform', tiles, 0, 0);
    map.setCollisionByProperty({collides: true});
    this.textures.addSpriteSheetFromAtlas('mario', {atlas: 'atlas', frame: 'mario_spritesheet.png', frameWidth: 16, frameHeight: 32});
    
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // this.special_platform.body.allowGravity = false;
    this.koin = this.physics.add.image(100, 80, 'atlas', 'coin.png');
    this.suaraKoin = this.sound.add('tring');
    this.suaraPause = this.sound.add('pause-sound');

    this.mario = this.physics.add.sprite(150, 100, 'mario', 0);
    this.anims.create({
      key: 'kanan',
      frames: this.anims.generateFrameNumbers('mario', {start: 2, end: 4}),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: 'kanan-fast',
      frames: this.anims.generateFrameNumbers('mario', {start: 2, end: 4}),
      repeat: -1,
      frameRate: 20,
    });

    this.anims.create({
      key: 'stop-kanan',
      frames: [{key: 'mario', frame: 0}],
      frameRate: 10,
    });
    
    this.anims.create({
      key: 'stop-kiri',
      frames: [{key: 'mario', frame: 23}],
      frameRate: 10,
    });

    this.anims.create({
      key: 'lompat-kanan',
      frames: [{key: 'mario', frame: 6}],
      frameRate: 10,
    });


    this.anims.create({
      key: 'lompat-kiri',
      frames: [{key: 'mario', frame: 17}],
      frameRate: 10,
    });

    this.anims.create({
      key: 'kiri',
      frames: [{key: 'mario', frame: 21}, {key: 'mario', frame:20}, {key: 'mario', frame: 19}],
      repeat: -1,
      frameRate: 10,
    });

    this.keyboard = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.mario);
    this.cameras.main.setLerp(0.1, 0.1);


    this.physics.add.collider(this.mario, platform_layer);
    this.physics.add.collider(this.koin, platform_layer);
    this.physics.add.overlap(this.mario, this.koin, this.getCoin, null, this);

    evn.on("PAUSE", this.pauseGame, this);
    
  }

  pauseGame(pausedText){
    if (this.scene.isPaused()) {
      this.suaraPause.play();
      this.scene.resume();
      pausedText.setVisible(false);
    }
    else {
      this.suaraPause.play();
      this.scene.pause();
      pausedText.setVisible(true);
    }
  }

  getCoin(pplatform_layer, koin){
    evn.emit("ADD-SCORE");
    this.suaraKoin.play();
    koin.destroy();
  }

  update(){
    this.controlHandler();
    // if (this.spaceKey.isDown) {
    //   this.mario.body.velocity.x *= 1.8;
    // }
  //   if (this.special_platform.y < this.mario.y){
  //     this.platcol.active = false;
  //   } else {
  //     this.platcol.active = true;
  //   }
  }

  controlHandler(){
    if (this.keyboard.right.isDown){
      this.mario.anims.play('kanan', true);
      this.mario.setVelocityX(100);
      if (this.spaceKey.isDown) {
        this.mario.body.velocity.x *= 2;
        this.mario.anims.play({key: 'kanan', frameRate: 20}, true);
      }
    }
    else if (this.keyboard.left.isDown){
      this.mario.anims.play('kiri', true);
      this.mario.setVelocityX(-100);
      if (this.spaceKey.isDown) {
        this.mario.body.velocity.x *= 2;
        this.mario.anims.play({key: 'kiri', frameRate: 20}, true);
      }
    }
    else {
      var deltaX = this.mario.body.deltaX();
      this.mario.setVelocityX(0);
      if (deltaX < 0) {
        this.mario.anims.play('stop-kiri');
      }
      else if (deltaX > 0) {
        this.mario.anims.play('stop-kanan');
      }
    }

    if (this.keyboard.up.isDown && this.mario.body.blocked.down){
      this.mario.setVelocityY(-200);
    }
    if (!this.mario.body.blocked.down){
      if (this.keyboard.right.isDown ){
        this.mario.anims.play('lompat-kanan');
      }
      else if (this.keyboard.left.isDown) {
        this.mario.anims.play('lompat-kiri');
      }
    }

  }
}
