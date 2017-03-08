//var mything = false;
AFRAME.registerComponent('rccolorchanger', {
  schema: {
    triggerrad: {type: 'number', default: 1.0}
  },

  init: function() {
    this.triggerpos = new THREE.Vector3();
    //var sky1 = document.querySelector('#sky1');
    //sky1.getAttribute('src').setAttribute('visible', false);
  },

  update: function() {
    var temppos = this.el.getAttribute('position');
    this.triggerpos.set(temppos.x, temppos.y, temppos.z);
  },

  tick: function() {
    var sky = document.querySelector('#sky');
    var box = document.querySelector('#box');
    var sphere = document.querySelector('#sphere');
    var scene = document.querySelector('a-scene');
    var campos = scene.camera.getWorldPosition();

    if(campos.distanceTo(this.triggerpos) < this.data.triggerrad) {
      //sky.setAttribute('color', this.el.getAttribute('color'));
      //sky.setAttribute('opacity', 0);
      sky.setAttribute('src', 'images/pano_raw.JPG');
      sky.setAttribute('color', '0xFFFFFF');
      box.setAttribute('scale', '0.0 0.0 0.0')
      //sphere.setAttribute('radius', '0.0');
      //sky.setAttribute('opacity', 0.5);
      //mat.setAttribute('visible', true);
    }
    else
    {
      //sky.setAttribute('src', '');
      //set.setAttribute('color', '0xFFAAFF');
      box.setAttribute('scale', '-200.0 -200.0 -200.0')
    }
  }
});
