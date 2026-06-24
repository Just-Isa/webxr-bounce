AFRAME.registerComponent("mover", {
  init: function () {
    this.animateMove = (e) => {
      const body = this.el.body;
      if (!body) return;
      const strength = 5;

      const dir = new THREE.Vector3();
      this.el.sceneEl.camera.el.object3D.getWorldDirection(dir);

      if (body.velocity.x < 2 && body.velocity.z < 2 && body.velocity.z < 2) {
        // apply impulse (BEST PRACTICE)
        body.applyImpulse(
          new CANNON.Vec3(
            dir.x * -strength,
            dir.y * -strength,
            dir.z * -strength,
          ),
          body.position,
        );
      } else {
        console.log("hi");
      }
    };

    this.el.addEventListener("click", this.animateMove);
  },

  remove: function () {
    this.el.removeEventListener("click", this.animateMove);
  },
});
