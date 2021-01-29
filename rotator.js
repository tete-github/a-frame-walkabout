/* global AFRAME, THREE */

AFRAME.registerComponent("rotator", {
  schema: {
    rig: { type: "selector" },
    box: { type: "selector" },
    box2: { type: "selector" }
  },

  init: function() {
    this.bindMethods();

    this.el.addEventListener("pinchstarted", this.onPinchStarted);
    this.el.addEventListener("pinchended", this.onPinchEnded);
    this.el.addEventListener("gripdown", this.onPinchStarted);
    this.el.addEventListener("gripup", this.onPinchEnded);

    this.rig = this.data.rig;
    this.box = this.data.box;
    this.box2 = this.data.box2;
    this.camera = this.el.sceneEl.camera.el;
    this.axisY = new THREE.Vector3(0, 1, 0);
  },

  bindMethods: function() {
    this.onPinchStarted = this.onPinchStarted.bind(this);
    this.onPinchEnded = this.onPinchEnded.bind(this);
  },

  onPinchStarted: function() {
    this.trigger = 1;
    this.oldCameraAngle = this.camera.getAttribute("rotation").y;
  },

  tick: function() {
    
    if (this.trigger == 1) {
      
      var angleDifference = THREE.Math.degToRad(
      this.oldCameraAngle - this.camera.getAttribute("rotation").y );
      
      this.oldCameraAngle = this.camera.getAttribute("rotation").y;

      var cameraPosition = new THREE.Vector3();
      cameraPosition.setFromMatrixPosition(this.camera.object3D.matrixWorld);

      this.rig.object3D.position.add( cameraPosition.negate() );
      this.rig.object3D.position.applyAxisAngle( this.axisY, angleDifference );
      this.rig.object3D.position.add( cameraPosition.negate() );
      this.rig.object3D.rotateOnAxis( this.axisY, angleDifference );
    }
  },

  onPinchEnded: function() {
    this.trigger = 0;
  }
  
});
