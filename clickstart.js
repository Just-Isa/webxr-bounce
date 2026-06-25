AFRAME.registerComponent("clickstart", {
  init: function () {
    const soundComp = this.el.components.sound;

    this.soundReady = false;
    this.playingSound = false;

    this.clickFunction = () => {
      const sound = this.el.components.sound;
      if (!sound) return;

      if (!this.playingSound) {
        sound.playSound();
        this.playingSound = true;
        return;
      } else {
        sound.stopSound();
        this.playingSound = false;
        return;
      }
    };

    if (soundComp) {
      soundComp.el.addEventListener("sound-loaded", () => {
        this.soundReady = true;
      });
    }

    this.el.addEventListener("click", this.clickFunction);
  },
  remove: function () {
    this.el.removeEventListener("click", this.clickFunction);
  },
});
