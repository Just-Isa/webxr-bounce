// https://github.com/nkawa/AFrameMirrorTest/blob/main/src/app/home.jsx THIS COULD BE INTERESTING
AFRAME.registerComponent("mirror", {
  init() {
    const sceneEl = this.el.sceneEl;
    this.threeScene = sceneEl.object3D;
    this.renderer = sceneEl.renderer;

    // new rendertarget & camera for the mirrors pov
    this.rt = new THREE.WebGLRenderTarget(512, 512);
    this.cam = new THREE.PerspectiveCamera(70, 1, 0.01, 20);

    // material of mirror
    this.mirrorMesh = this.el.getObject3D("mesh");
    this.mirrorMesh.material.map = this.rt.texture;
    this.mirrorMesh.material.metalness = 0.1;
    this.mirrorMesh.material.roughness = 0.0;
    this.mirrorMesh.material.needsUpdate = true;
    this.el.setAttribute("side", "front");

    this.player = document.querySelector("#rig").object3D;
    this.C = new THREE.Vector3();
    this.P = new THREE.Vector3();
    this.N = new THREE.Vector3(0, 0, 1);
  },

  tick() {
    const rig = document.querySelector("#rig");

    // Camera world position
    const cameraPos = new THREE.Vector3();
    rig.object3D.getWorldPosition(cameraPos);

    // Camera forward direction
    const lookDir = new THREE.Vector3();
    rig.object3D.getWorldDirection(lookDir);

    // Mirror world position
    const mirrorPos = new THREE.Vector3();
    this.el.object3D.getWorldPosition(mirrorPos);

    // Mirror world normal
    const mirrorNormal = new THREE.Vector3(0, 0, 1);
    mirrorNormal.applyQuaternion(
      this.el.object3D.getWorldQuaternion(new THREE.Quaternion()),
    );
    mirrorNormal.normalize();

    // Ray-plane intersection
    const denom = lookDir.dot(mirrorNormal);

    if (Math.abs(denom) > 1e-6) {
      const t = mirrorPos.clone().sub(cameraPos).dot(mirrorNormal) / denom;

      this.intersection = cameraPos
        .clone()
        .add(lookDir.clone().multiplyScalar(t));

      // D = intersection - camera position
      this.D = this.intersection.clone().sub(cameraPos);
    }

    // MIRROR NORMAL
    // N -> plane normal (must be normalized
    // getWorldDirection points "out of mesh"
    // for planes i needed to flip it
    const N = mirrorNormal.clone();
    N.normalize();

    // REFLECTION FORMULA
    // R = D − 2 (D ⋅ N) N
    // R -> reflected direction vector (NOT world position)
    const R = this.D.clone().sub(N.clone().multiplyScalar(2 * this.D.dot(N)));

    // CAMERA TARGET
    // lookAt requires a WORLD POSITION
    // convert reflected direction into a point in space
    const reflectedTarget = this.C.clone().add(R);
    reflectedTarget.add(N.clone());

    // APPLY MIRROR CAMERA
    const intersectionPos = this.intersection.clone();
    intersectionPos.y = 1;

    this.cam.position.copy(intersectionPos);
    this.cam.updateMatrixWorld();

    this.cam.lookAt(reflectedTarget);

    // RENDER TO TEXTURE
    const prev = this.renderer.getRenderTarget();

    this.mirrorMesh.visible = false;
    this.renderer.setRenderTarget(this.rt);
    this.renderer.clear(true, true, true);
    this.renderer.render(this.threeScene, this.cam);
    this.renderer.setRenderTarget(prev);

    this.mirrorMesh.visible = true;
  },
});
