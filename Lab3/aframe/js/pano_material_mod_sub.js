AFRAME.registerShader(pano-shader-magic {
  schema: {
    src: {type: map is: uniform},
  },

  vertexShader: [
    varying vec2 vUV;
    varying vec3 worldViewDir;
    void main(void) {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      worldViewDir = worldPos.xyz - cameraPosition;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUV = uv;
    }
  ].join(\n),

  fragmentShader: [
    #define M_PI 3.1415926535897932384626433832795
    uniform sampler2D src;
    varying vec2 vUV;
    varying vec3 worldViewDir;
    vec3 panoMap(vec3 vdir) {
      // // functions that might help: atan(y,x) => [-M_PI, M_PI]
      // // you can get components of vdir like vdir.x, vdir.y, vdir.z
      float x = vdir.x;
      float z = vdir.z;
      float r = sqrt(x*x + z*z);
      float rad1 = atan(x, z);
      float rad2 = atan(r, vdir.y);
      vec2 uv = vec2((rad1 / M_PI) * 0.5 + 0.5, (rad2 / (M_PI * 0.5)) * 0.5 + 0.5); 
      // vec2 uv = vec2(??, ??);
      return texture2D(src, uv).rgb; // uncomment this when you have uv!
      //return texture2D(src, vdir.zx * 0.5 + 0.5).rgb; // get rid of this line
    }
    void main() {
      vec3 ndir = normalize(worldViewDir);
      gl_FragColor.rgb = panoMap(ndir);
      gl_FragColor.a = 1.0;
    }
  ].join(\n)
});
