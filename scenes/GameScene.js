import Phaser from 'phaser';
import evn from './EventCenter';

export default class GameScene extends Phaser.Scene {
  constructor(){
    super({key: "GameScene"});
  }

  create(){
    const atlas = this.textures.get('atlas');
    const frames = atlas.getFrameNames();
    this.awan1 = this.add.image(100, 100, 'atlas', frames[5]);
    this.awan2 = this.add.image(200, 50, 'atlas', frames[5]);
    this.awan3 = this.add.image(300, 70, 'atlas', frames[5]);
    this.awan4 = this.add.image(400, 100, 'atlas', frames[5]);

    this.tanah = this.physics.add.staticGroup();
    this.tanah.create(80, 350, 'atlas', frames[2]);
    this.tanah.create(300, 290, 'atlas', frames[2]);
    this.tanah.create(500, 250, 'atlas', frames[2]);
    this.koin = this.physics.add.image(50, 280, 'atlas', frames[9]);
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
      frames: [{key: 'mario', frame: 11}],
      frameRate: 10,
    });


    this.anims.create({
      key: 'lompat-kiri',
      frames: [{key: 'mario', frame: 12}],
      frameRate: 10,
    });

    this.anims.create({
      key: 'kiri',
      frames: [{key: 'mario', frame: 21}, {key: 'mario', frame:20}, {key: 'mario', frame: 19}],
      repeat: -1,
      frameRate: 10,
    });

    this.keyboard = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setLerp(0.1, 0.1);


    this.physics.add.collider(this.player, this.tanah);
    this.physics.add.collider(this.koin, this.tanah);
    this.physics.add.overlap(this.player, this.koin, this.ambilKoin, null, this);

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

  ambilKoin(player, koin){
    evn.emit("ADD-SCORE");
    this.suaraKoin.play();
    koin.destroy();
  }

  update(){
    if (this.keyboard.right.isDown){
      this.player.anims.play('kanan', true);
      this.player.setVelocityX(100);
    }
    else if (this.keyboard.left.isDown){
      this.player.anims.play('kiri', true);
      this.player.setVelocityX(-100);
    }
    else {
      if (this.player.body.facing == 14){
        this.player.anims.play('stop-kanan');
        this.player.setVelocityX(0);
      }
      else if (this.player.body.facing == 13){
        this.player.anims.play('stop-kiri');
        this.player.setVelocityX(0);
      }
    }

    if (this.keyboard.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-200);
    }

    if (!this.player.body.touching.down && this.keyboard.right.isDown){
      this.player.anims.play('lompat-kanan');
    }
    if (!this.player.body.touching.down && this.keyboard.left.isDown){
      this.player.anims.play('lompat-kiri');
    }

  }
}
