/* global AFRAME, THREE */

AFRAME.registerComponent("rotator", {
  schema: {
    rig: { type: "selector" },
  },

  init: function() {
    this.bindMethods();

    this.el.addEventListener("pinchstarted", this.onPinchStarted);
    this.el.addEventListener("pinchended", this.onPinchEnded);
    this.el.addEventListener("gripdown", this.onPinchStarted);
    this.el.addEventListener("gripup", this.onPinchEnded);

    this.rig = this.data.rig;
    this.camera = this.el.sceneEl.camera.el;
    this.axisY = new THREE.Vector3(0, 1, 0);
  },

  bindMethods: function() {
    this.onPinchStarted = this.onPinchStarted.bind(this);
    this.onPinchEnded = this.onPinchEnded.bind(this);
  },

  onPinchStarted: function() {
    this.trigger = 1;
    this.cameraAngle = this.camera.getAttribute("rotation").y;
  },

  tick: function() {
    
    if (this.trigger == 1) {
      
      var cameraAngle = THREE.Math.degToRad(
      this.cameraAngle - this.camera.getAttribute("rotation").y );
      
      this.cameraAngle = this.camera.getAttribute("rotation").y;

      var cameraPosition = new THREE.Vector3();
      cameraPosition.setFromMatrixPosition(this.camera.object3D.matrixWorld);

      this.rig.object3D.position.add( cameraPosition.negate() );
      this.rig.object3D.position.applyAxisAngle( this.axisY, cameraAngle );
      this.rig.object3D.position.add( cameraPosition.negate() );
      this.rig.object3D.rotateOnAxis( this.axisY, cameraAngle );
    }
  },

  onPinchEnded: function() {
    this.trigger = 0;
  }
  
});
