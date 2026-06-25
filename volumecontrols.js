AFRAME.registerComponent("volumecontrols", {
  schema: {
    volume: { type: "number", default: 0.2 },
  },
  init: function () {
    this.inputElement = document.getElementById("volume-slider");
    this.el.setAttribute("sound", "volume", this.data.volume);
    this.volumeFunction = (event) => {
      this.el.setAttribute("sound", "volume", 0.4 * (event.target.value / 100));
    };
    this.inputElement.addEventListener("input", this.volumeFunction);
  },

  remove: function () {
    this.inputElement.removeEventListener("input", this.volumeFunction);
  },
});
