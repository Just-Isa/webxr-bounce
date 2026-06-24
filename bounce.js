AFRAME.registerComponent("bounce", {
  init() {
    this.growing = true;
  },
  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    console.log(time);
    if (this.el.object3D.scale.z > 0.025) {
      this.growing = false;
    }

    if (this.el.object3D.scale.z < 0.02) {
      this.growing = true;
    }

    if (this.growing) {
      this.el.object3D.scale.z += 0.00018;
      this.el.object3D.scale.x -= 0.00028;
    } else {
      this.el.object3D.scale.z -= 0.00018;
      this.el.object3D.scale.x += 0.00028;
    }
  },
});
