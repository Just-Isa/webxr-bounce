AFRAME.registerComponent("collision", {
  init: function () {
    this.el.addEventListener("collide", this.detectCollision);
  },

  remove: function () {
    this.el.removeEventListener("collide", this.detectCollision);
  },
});
