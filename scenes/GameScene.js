import Phaser from 'phaser';
import evn from './EventCenter';

export default class GameScene extends Phaser.Scene {
  constructor(){
    super({key: "GameScene"});
  }

  create(){
    const map = this.make.tilemap({key: 'level00'});
    const tiles = map.addTilesetImage('tile_map', 'tiles');
    const layer = map.createLayer(0, tiles, 0, 0);
    this.textures.addSpriteSheetFromAtlas('mario', {atlas: 'atlas', frame: 'mario_spritesheet.png', frameWidth: 16, frameHeight: 32});
    const awan = "cloud.png";
    const tanah = "ground-long.png";
    const koin = "coin.png";
    this.awan1 = this.add.image(100, 100, 'atlas', awan);
    this.awan2 = this.add.image(200, 50, 'atlas', awan);
    this.awan3 = this.add.image(300, 70, 'atlas', awan);
    this.awan4 = this.add.image(400, 100, 'atlas', awan);

    this.tanah = this.physics.add.staticGroup();
    this.tanah.create(80, 350, 'atlas', tanah);
    this.tanah.create(300, 290, 'atlas', tanah);
    this.tanah.create(500, 250, 'atlas', tanah);
    this.special_platform = this.physics.add.staticImage(100, 300, 'atlas', 'platform.png');
    // this.special_platform.body.allowGravity = false;
    this.koin = this.physics.add.image(50, 280, 'atlas', koin);
    this.suaraKoin = this.sound.add('tring');
    this.suaraPause = this.sound.add('pause-sound');

    this.player = this.physics.add.sprite(150, 100, 'mario', 0);
    this.anims.create({
      key: 'kanan',
      frames: this.anims.generateFrameNumbers('mario', {start: 2, end: 4}),
      repeat: -1,
      frameRate: 10,
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
    console.log(map.widthInPixels);
    console.log(map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setLerp(0.1, 0.1);


    this.physics.add.collider(this.player, this.tanah);
    this.physics.add.collider(this.koin, this.tanah);
    this.physics.add.overlap(this.player, this.koin, this.getCoin, null, this);
    this.platcol = this.physics.add.collider(this.player, this.special_platform);

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

  getCoin(player, koin){
    evn.emit("ADD-SCORE");
    this.suaraKoin.play();
    koin.destroy();
  }

  update(){
    this.controlHandler();
    if (this.special_platform.y < this.player.y){
      this.platcol.active = false;
    } else {
      this.platcol.active = true;
    }
  }

  controlHandler(){
    if (this.keyboard.right.isDown){
      this.player.anims.play('kanan', true);
      this.player.setVelocityX(100);
    }
    else if (this.keyboard.left.isDown){
      this.player.anims.play('kiri', true);
      this.player.setVelocityX(-100);
    }
    else {
      var deltaX = this.player.body.deltaX();
      this.player.setVelocityX(0);
      if (deltaX < 0) {
        this.player.anims.play('stop-kiri');
      }
      else if (deltaX > 0) {
        this.player.anims.play('stop-kanan');
      }
    }

    if (this.keyboard.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-200);
    }
    if (!this.player.body.touching.down){
      if (this.keyboard.right.isDown ){
        this.player.anims.play('lompat-kanan');
      }
      else if (this.keyboard.left.isDown) {
        this.player.anims.play('lompat-kiri');
      }
    }

  }
}
