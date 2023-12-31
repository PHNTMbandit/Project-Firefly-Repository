import { getShip } from "./ships";

export default class PlayerController {
  constructor(scene, x, y) {
    this.player = getShip("Player").spawn(scene, x, y);
  }

  moveShip(cursors) {
    this.player.ship.body.velocity.scale(0.5);

    if (cursors.left.isDown) {
      this.player.moveX(-this.player.speed);
    } else if (cursors.right.isDown) {
      this.player.moveX(this.player.speed);
    }

    if (cursors.up.isDown) {
      this.player.moveY(-this.player.speed);
    } else if (cursors.down.isDown) {
      this.player.moveY(this.player.speed);
    }
  }

  shoot(keySpace, time) {
    this.player.useWeapon(keySpace, time);
  }
}
