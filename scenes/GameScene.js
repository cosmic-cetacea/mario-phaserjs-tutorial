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
    const vegetation_layer = map.createLayer('vegetation-bg', tiles, 0, 0);
    const platform_layer = map.createLayer('platform', tiles, 0, 0);
    map.setCollisionByProperty({collides: true});
    const objek_layer = map.getObjectLayer('objectpos')['objects'];

    this.textures.addSpriteSheetFromAtlas('mario', {atlas: 'atlas', frame: 'mario.png', frameWidth: 16, frameHeight: 32});
    this.textures.addSpriteSheetFromAtlas('princess_peach', {atlas: 'atlas', frame: 'peach.png', frameWidth: 16, frameHeight: 24});
    this.textures.addSpriteSheetFromAtlas('kirby', {atlas: 'atlas', frame: 'kirby.png', frameWidth: 16, frameHeight: 16});
    this.textures.addSpriteSheetFromAtlas('donkeykong', {atlas: 'atlas', frame: 'donkeykong.png', frameWidth: 48, frameHeight: 32});
    this.textures.addSpriteSheetFromAtlas('boble', {atlas: 'atlas', frame: 'boble.png', frameWidth: 16, frameHeight: 16});
    this.textures.addSpriteSheetFromAtlas('ice_climber', {atlas: 'atlas', frame: 'iceclimber.png', frameWidth: 16, frameHeight: 24});
    this.textures.addSpriteSheetFromAtlas('link', {atlas: 'atlas', frame: 'link.png', frameWidth: 16, frameHeight: 16});
    this.textures.addSpriteSheetFromAtlas('luigi', {atlas: 'atlas', frame: 'luigi.png', frameWidth: 16, frameHeight: 32});
    this.textures.addSpriteSheetFromAtlas('megaman', {atlas: 'atlas', frame: 'megaman.png', frameWidth: 24, frameHeight: 24});
    this.textures.addSpriteSheetFromAtlas('toad', {atlas: 'atlas', frame: 'toad.png', frameWidth: 16, frameHeight: 24});
    
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.koin = this.physics.add.image(100, 80, 'atlas', 'kirby.png');
    this.suaraKoin = this.sound.add('tring');
    this.suaraPause = this.sound.add('pause-sound');
    this.suaraLompat = this.sound.add('jump-sound');
    this.suaraMati = this.sound.add('die-sound');
  
    // Princess Peach
    this.peach = this.physics.add.sprite(600, 700, 'princess_peach', 0);
    // Kirby
    this.kirby = this.physics.add.sprite(objek_layer[1].x, objek_layer[1].y, 'kirby', 0);
    // Donkey Kong
    this.donkeykong = this.physics.add.sprite(objek_layer[0].x, objek_layer[0].y, 'donkeykong', 0);
    // Bub from Bubble Bobble
    console.log(objek_layer);
    this.bub = this.physics.add.sprite(objek_layer[2].x, objek_layer[2].y, 'boble', 0);
    // Popo from Ice Climbers
    this.ice_climber = this.physics.add.sprite(750, 700, 'ice_climber', 0);
    // Link from The Legend of Zelda
    this.link = this.physics.add.sprite(775, 700, 'link', 0);
    // Luigi
    this.luigi = this.physics.add.sprite(800, 700, 'luigi', 0);
    // Mega Man
    this.megaman = this.physics.add.sprite(825, 700, 'megaman', 0);
    // Toad
    this.toad = this.physics.add.sprite(850, 700, 'toad', 0);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, false, false);
    this.mario = this.physics.add.sprite(640, 700, 'mario', 0);
    this.mario.body.setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle-donkeykong',
      frames: this.anims.generateFrameNumbers('donkeykong', {start: 0, end: 2}),
      repeat: -1,
      frameRate: 4,
    });
    this.donkeykong.anims.play('idle-donkeykong');

    this.anims.create({
      key: 'idle-bub',
      frames: this.anims.generateFrameNumbers('boble', {start: 1, end: 3}),
      repeat: -1,
      frameRate: 4,
    });
    this.bub.anims.play('idle-bub');


    this.anims.create({
      key: 'idle-kirby',
      frames: this.anims.generateFrameNumbers('kirby', {start: 0, end: 3}),
      repeat: -1,
      frameRate: 8,
    });
    this.kirby.anims.play('idle-kirby');

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
    this.physics.add.collider(this.peach, platform_layer);
    this.physics.add.collider(this.kirby, platform_layer);
    this.physics.add.collider(this.donkeykong, platform_layer);
    this.physics.add.collider(this.bub, platform_layer);
    this.physics.add.collider(this.ice_climber, platform_layer);
    this.physics.add.collider(this.link, platform_layer);
    this.physics.add.collider(this.luigi, platform_layer);
    this.physics.add.collider(this.megaman, platform_layer);
    this.physics.add.collider(this.toad, platform_layer);


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
    this.deathChecker();
    // if (this.spaceKey.isDown) {
    //   this.mario.body.velocity.x *= 1.8;
    // }
  //   if (this.special_platform.y < this.mario.y){
  //     this.platcol.active = false;
  //   } else {
  //     this.platcol.active = true;
  //   }
  }

  deathChecker() {
    if (this.mario.y > 1920) {
      this.mario.destroy();
      this.suaraMati.play();
      this.scene.restart();
    }
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
      this.suaraLompat.play();
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
