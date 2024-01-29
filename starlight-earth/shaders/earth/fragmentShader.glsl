uniform sampler2D uTexture;
varying vec2 vUv;


void main () {
  vec4 map = texture2D(uTexture, vUv);
  vec3 color = 1.0 - map.rgb;
  float alpha = color.r;

  gl_FragColor = vec4(color, alpha);
}