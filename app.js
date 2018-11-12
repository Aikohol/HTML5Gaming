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

function preload() {
  this.load.image("tiles", "./assets/mapworld/tileset.png");
  this.load.tilemapTiledJSON("map", "./maps/WORLDMAP.json");

  this.load.image("chara", "./assets/chara/animations/undead/undead_left_walk.png");
}

function create() {

  const map = this.make.tilemap({ key: "map"});

  const tileset = map.addTilesetImage("worldmap", "tiles");
  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const visual_obstacle = map.createStaticLayer("visual_obstacle", tileset, 0, 0);
  const obstacle = map.createStaticLayer("obstacle", tileset, 0, 0);
  const door = map.createStaticLayer("door", tileset, 0, 0);

  player = this.physics.add.sprite(400, 350, "chara");

 worldLayer.setCollisionByProperty({ collides: true });
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(100);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);
}
