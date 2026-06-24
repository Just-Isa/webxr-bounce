AFRAME.registerComponent("lock-rotation", {
  tick() {
    if (!this.el.body) return;

    this.el.body.angularVelocity.set(0, 0, 0);
    this.el.body.quaternion.setFromEuler(0, 0, 0);
  },
});
