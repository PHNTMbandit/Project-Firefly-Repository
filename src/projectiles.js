var getProjectileType = function (projectileTypeName) {
  const types = {
    laser: {
      sprite: "SpaceShooterAssetPack_Projectiles-0.png",
      fireRate: 100,
      amount: 100,
      scale: 1,
    },
  };

  return types[projectileTypeName];
};

export default function spawnProjectileGroup(projectileTypeName, scene) {
  const projectileType = getProjectileType(projectileTypeName);
  return new ProjectileGroup(
    scene,
    projectileType.sprite,
    projectileType.fireRate,
    projectileType.amount,
    projectileType.scale
  );
}

class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, sprite, fireRate, amount, scale) {
    super(scene.physics.world, scene);

    this.sprite = sprite;
    this.fireRate = fireRate;
    this.fireElapsedTime = 0;

    this.projectiles = this.createMultiple({
      classType: Projectile,
      key: "projectiles",
      frame: sprite,
      frameQuantity: amount,
      active: false,
      visible: false,
      "setScale.x": scale,
      "setScale.y": scale,
    });

    this.projectiles.forEach((projectile) => projectile.setFrame(this.sprite));
  }

  shootProjectile(x, y, time) {
    const projectile = this.getFirstDead(false);

    if (projectile && time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;
      projectile.shoot(x, y);
    }
  }
}

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "projectiles");
  }

  shoot(x, y) {
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-100);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.disableBody(true, true);
    }
  }
}
