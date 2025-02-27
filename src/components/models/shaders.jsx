import glsl from 'glslify';

export const vertexShader = glsl`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

export const fragmentShader = glsl`
  uniform sampler2D uTexture;
  uniform sampler2D uNoiseTexture;
  uniform float uTime;

  void main() {
    vec2 noise = texture2D(uNoiseTexture, vUv + uTime * 0.1).rg; 
    vec2 distortedUV = vUv + (noise * 2 - 0.4);  // Cette ligne prend le bruit et l'utilise pour perturber les coordonnées UV. 0.2 est l'intensité de la distorsion.
    gl_FragColor = texture2D(uTexture, distortedUV);
  }
`;
