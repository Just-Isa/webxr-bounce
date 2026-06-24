AFRAME.registerComponent("player-move", {
  schema: {
    speed: { type: "number", default: 1 },
    runningspeed: { type: "number", default: 1.5 },
  },
  init() {
    this.direction = new THREE.Vector3();
    const cameraDirection = this.el.sceneEl.camera.el.object3D;
    const mapOfKeys = {};
    this.isRunning = false;
    window.addEventListener("keydown", (e) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        this.isRunning = true;
      }
      if (e.code === "KeyW") this.direction.z = -this.data.speed;
      if (e.code === "KeyS") this.direction.z = this.data.speed;
      if (e.code === "KeyA") this.direction.x = this.data.speed;
      if (e.code === "KeyD") this.direction.x = -this.data.speed;
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        this.isRunning = false;
      }
      if (e.code === "KeyW" || e.code === "KeyS") this.direction.z = 0;
      if (e.code === "KeyA" || e.code === "KeyD") this.direction.x = 0;
    });
  },

  tick() {
    const body = this.el.body;
    if (!body) return;

    const forward = new THREE.Vector3();
    this.el.sceneEl.camera.el.object3D.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3();
    right.crossVectors(forward, up).normalize();

    let move = new THREE.Vector3();

    move.addScaledVector(forward, this.direction.z); // W/S
    move.addScaledVector(right, this.direction.x); // A/D
    if (this.isRunning) {
      body.velocity.x = move.x * 8;
      body.velocity.z = move.z * 8;
    } else {
      body.velocity.x = move.x * 5;
      body.velocity.z = move.z * 5;
    }
  },

  remove: function () {
    // Do something the component or its entity is detached.
    this.el.removeEventListener("keydown");
    this.el.removeEventListener("keyup");
  },
});
