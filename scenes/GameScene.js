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
    const vegetation_layer = map.createLayer('vegetation-bg-building', tiles, 0, 0);
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
    // this.koin = this.physics.add.image(100, 80, 'atlas', 'kirby.png');
    this.suaraKoin = this.sound.add('tring');
    this.suaraPause = this.sound.add('pause-sound');
    this.suaraLompat = this.sound.add('jump-sound');
    this.suaraMati = this.sound.add('die-sound');
    this.suaraGetPizza = this.sound.add('getPizza-sound');
  
    // Princess Peach
    this.peach = this.physics.add.sprite(objek_layer[4].x, objek_layer[4].y, 'princess_peach', 0);
    // Kirby
    this.kirby = this.physics.add.sprite(objek_layer[1].x, objek_layer[1].y, 'kirby', 0);
    // Donkey Kong
    this.donkeykong = this.physics.add.sprite(objek_layer[0].x, objek_layer[0].y, 'donkeykong', 0);
    // Bub from Bubble Bobble
    this.bub = this.physics.add.sprite(objek_layer[2].x, objek_layer[2].y, 'boble', 0);
    // Popo from Ice Climbers
    this.ice_climber = this.physics.add.sprite(objek_layer[8].x, objek_layer[8].y, 'ice_climber', 0);
    // Link from The Legend of Zelda
    this.link = this.physics.add.sprite(objek_layer[9].x, objek_layer[9].y, 'link', 0);
    // Luigi
    this.luigi = this.physics.add.sprite(objek_layer[6].x, objek_layer[6].y, 'luigi', 0);
    // Mega Man
    this.megaman = this.physics.add.sprite(objek_layer[7].x, objek_layer[7].y, 'megaman', 0);
    // Toad
    this.toad = this.physics.add.sprite(objek_layer[5].x, objek_layer[5].y, 'toad', 0);

    this.pizza_logo = this.physics.add.staticSprite(objek_layer[10].x, objek_layer[10].y, 'pizza', 0);
    this.add.text(objek_layer[10].x, objek_layer[10].y + 8, "Pizza", {fontStyle: 'strong', fontSize: '24px'}).setBackgroundColor('#000000').setOrigin(0.5, 0);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, false, false);
    this.mario = this.physics.add.sprite(objek_layer[3].x, objek_layer[3].y, 'mario', 0);
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
      key: 'idle-climber',
      frames: this.anims.generateFrameNumbers('ice_climber', {start: 0, end: 3}),
      repeat: -1,
      frameRate: 8,
    });
    this.ice_climber.anims.play('idle-climber');

    this.anims.create({
      key: 'idle-megaman',
      frames: this.anims.generateFrameNumbers('megaman', {start: 0, end: 1}),
      repeat: -1,
      frameRate: 1,
    });
    this.megaman.anims.play('idle-megaman');

    this.anims.create({
      key: 'idle-link',
      frames: this.anims.generateFrameNumbers('link', {start: 0, end: 1}),
      repeat: -1,
      frameRate: 4,
    });
    this.link.anims.play('idle-link');

    this.anims.create({
      key: 'kanan',
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
      frameRate: 20,
    });


    Phaser.GameObjects.BitmapText.ParseFromAtlas(this, 'kenney-font', 'atlas', 'kenney_mini.png', 'kenney-mini');
    this.deliveryToText = this.add.bitmapText(20, 40, 'kenney-font', "", 24);
    this.deliveryToText.setTintFill(0xffffff);
    this.deliveryToText.setScrollFactor(0);

    this.hold_pizza = false;

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
    this.pizza_mario_overlap = this.physics.add.overlap(this.mario, this.pizza_logo, () => {
      this.hold_pizza = true;
      this.pizza_logo.setVisible(false);
      // this.suaraGetPizza.play();
      if (!this.suaraGetPizza.isPlaying){
        this.suaraGetPizza.play();
      }
    }, null, this);

    // this.physics.add.collider(this.koin, platform_layer);
    // this.physics.add.overlap(this.mario, this.koin, this.getCoin, null, this);
    this.luigi_overlap = this.physics.add.overlap(this.mario, this.luigi, () => {
      if (this.hold_pizza) {
        this.luigi_overlap.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.luigi_overlap.active = false;


    this.kirby_overlap = this.physics.add.overlap(this.mario, this.kirby, () => {
      if (this.hold_pizza) {
        this.kirby_overlap.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.kirby_overlap.active = false;


    this.donkeykong_overlap = this.physics.add.overlap(this.mario, this.donkeykong, () => {
      if (this.hold_pizza) {
        this.donkeykong.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.donkeykong_overlap.active = false;


    this.toad_overlap = this.physics.add.overlap(this.mario, this.toad, () => {
      if (this.hold_pizza) {
        this.toad.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.toad_overlap.active = false;


    this.bub_overlap = this.physics.add.overlap(this.mario, this.bub, () => {
      if (this.hold_pizza) {
        this.bub.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.bub_overlap.active = false;


    this.iceclimber_overlap = this.physics.add.overlap(this.mario, this.ice_climber, () => {
      if (this.hold_pizza) {
        this.iceclimber_overlap.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.iceclimber_overlap.active = false;


    this.megaman_overlap = this.physics.add.overlap(this.mario, this.megaman, () => {
      if (this.hold_pizza) {
        this.megaman_overlap.active = false;
        evn.emit("ADD-SCORE");
        this.suaraKoin.play();
        this.hold_pizza = false;
        this.pizza_logo.setVisible(true);
        this.startDelivery.play();
      }
    }, null, this);
    this.megaman_overlap.active = false;

    this.overlap_char_list = [this.luigi_overlap, this.kirby_overlap, this.donkeykong_overlap, this.toad_overlap, this.bub_overlap, this.iceclimber_overlap, this.megaman_overlap];

    evn.on("PAUSE", this.pauseGame, this);

    this.startDelivery = this.add.timeline([
      {
        at: 500,
        run: () => {
          this.deliveryToText.setText("Deliver Pizza To: . . .");
        }
      },
      {
      at: 1500,
      run: () => {
        var random_index_num = Phaser.Math.Between(0,6);
        switch(random_index_num){
          case 0:
            this.deliveryToText.setText("Deliver Piza To: Luigi");
            break;
          case 1:
            this.deliveryToText.setText("Deliver Pizza To: Kirby");
            break;
          case 2:
            this.deliveryToText.setText("Deliver Pizza To: Donkey Kong");
            break;
          case 3:
            this.deliveryToText.setText("Deliver Pizza To: Toad");
            break;
          case 4:
            this.deliveryToText.setText("Deliver Pizza To: Bub");
            break;
          case 5:
            this.deliveryToText.setText("Deliver Pizza To: Ice Climber");
            break;
          case 6:
            this.deliveryToText.setText("Deliver Pizza To: Megaman");
            break;
        }
        // this.overlap_char_group.getChildren()[0].active = true;
        this.overlap_char_list[random_index_num].active = true;
      }
      }
    ]);

    this.time.addEvent({delay: 2000, callback: () => {
      this.startDelivery.play();
    }, callbackScope: this});

    
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

  update(){
    this.controlHandler();
    this.deathChecker();
  }

  deathChecker() {
    if (this.mario.y > 1920) {
      this.mario.destroy();
      this.suaraMati.play();
      this.cameras.main.flash(1000, 255, 0, 0);
      this.scene.restart();
    }
  }

  controlHandler(){
    if (this.keyboard.right.isDown){
      this.mario.anims.play('kanan', true);
      this.mario.setVelocityX(200);
    }
    else if (this.keyboard.left.isDown){
      this.mario.anims.play('kiri', true);
      this.mario.setVelocityX(-200);
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
