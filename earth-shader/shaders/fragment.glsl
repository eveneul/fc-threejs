uniform vec3 uColor;
uniform float uAlpha;
uniform sampler2D tDiffuse;
uniform vec2 uPosition;
uniform float uBrightness;
varying vec2 vPosition;
varying vec2 vUv;

void main() {
  vec2 newUV = vec2(vUv.x, vUv.y);
  vec4 tex = texture2D(tDiffuse, newUV);

  tex.rgb += uColor;

  float brightness = sin(uBrightness + vUv.x);
  gl_FragColor = tex;
}