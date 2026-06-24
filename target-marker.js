AFRAME.registerComponent("target-marker", {
  schema: {},

  init: function () {
    let el = this.el;

    this.addMarker = function (e) {
      let p = e.detail.intersection.point;
      let scene = document.querySelector("a-scene");

      let newMark = document.createElement("a-entity");
      newMark.setAttribute("geometry", {
        primitive: "sphere",
      });
      newMark.setAttribute("material", "color: red");

      const worldScale = new THREE.Vector3();
      el.object3D.getWorldScale(worldScale);

      newMark.setAttribute(
        "scale",
        `${0.1 / worldScale.x} ${0.1 / worldScale.y} ${0.1 / worldScale.z}`,
      );

      // need to convert from global to local coordinates since we set the spheres on the cube
      newMark.setAttribute("position", el.object3D.worldToLocal(p.clone()));
      newMark.setAttribute("target-marker", {});

      el.appendChild(newMark);
    };

    this.el.addEventListener("click", this.addMarker);
    // Do something when component first attached.
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
    this.el.removeEventListener("click", this.addMarker);
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
});
