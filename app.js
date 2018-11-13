const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  }
};

const game = new Phaser.Game(config);
let cursors;
let player;
let showDebug = false;

function preload() {
  this.load.image("tiles", "./assets/mapworld/tileset.png");
  this.load.tilemapTiledJSON("map", "./maps/WORLDMAP.json");

  this.load.image("chara", "./assets/chara/animations/undead/undead_left_walk.png");

  this.load.spritesheet('undead',
         'assets/chara/animations/undead/walkcycle_undead.png',
       { frameWidth: 16, frameHeight: 16 }, 0);
}

function create() {

  this.add.text(16, 16, 'World Map', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
  })
  .setScrollFactor(0)
  .setDepth(30);

  const map = this.make.tilemap({ key: "map"});

  const tileset = map.addTilesetImage("worldmap", "tiles");
  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const visual_obstacle = map.createStaticLayer("visual_obstacle", tileset, 0, 0);
  const obstacle = map.createStaticLayer("obstacle", tileset, 0, 0);
  const door = map.createStaticLayer("door", tileset, 0, 0);
  console.log(obstacle);

  player = this.physics.add
    .sprite(350, 450, "undead", "left_walk")
    .setSize(16, 16)
    .setOffset(0, 24);

  console.log(player)

  this.physics.add.collider(player, obstacle);

  const anims = this.anims;

  anims.create({
    key: "left-walk",
    frames: anims.generateFrameNames("undead", { start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "right-walk",
    frames: anims.generateFrameNames("undead", { start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "up-walk",
    frames: anims.generateFrameNames("undead", { start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "down-walk",
    frames: anims.generateFrameNames("undead", { start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });

  visual_obstacle.setCollisionByProperty({ collides: true });
}

function update(time, delta) {
  const speed = 175;
  const prevVelocity = player.body.velocity.clone();
  // Runs once per frame for the duration of the scene
  cursors = this.input.keyboard.createCursorKeys();
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-50);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(50);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-50);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(50);
  }
  if (prevVelocity.x < 0) player.setTexture("undead", "left-walk");
  else if (prevVelocity.x > 0) player.setTexture("undead", "walkcycle_undead");
  else if (prevVelocity.y < 0) player.setTexture("undead", "down-walk");
  else if (prevVelocity.y > 0) player.setTexture("undead", "up-walk");


  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);
}
