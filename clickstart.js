AFRAME.registerComponent("clickstart", {
  init: function () {
    const soundComp = this.el.components.sound;

    this.soundReady = false;

    if (soundComp) {
      soundComp.el.addEventListener("sound-loaded", () => {
        console.log("hi");
        this.soundReady = true;
      });
    }

    this.el.addEventListener("click", () => {
      const sound = this.el.components.sound;
      if (!sound) return;

      sound.playSound();
    });
  },
});
