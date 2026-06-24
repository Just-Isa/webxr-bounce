AFRAME.registerComponent("return-emitter", {
  init: function () {
    let el = this.el;
    this.returnCall = function () {
      let p = el.getAttribute("position");
      el.emit("returnSphere", {
        returnPoint: p,
      });
    };
    this.el.addEventListener("click", this.returnCall);
  },
  remove: function () {
    // Do something the component or its entity is detached.
    this.el.removeEventListener("click", this.returnCall);
  },
});
