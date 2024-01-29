varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;

void main () {
  vec2 toCenter = vUv - 0.5;
  float dist = length(toCenter);
  float dir = dot(toCenter, vec2(1.0, 1.0));
  float strength = 0.5;
  vec2 wave = vec2(sin(dist * 20.0 - uTime * 5.0), cos(dist * 20.0 - uTime * 5.0));
  vec2 newUv = vUv + wave * strength * dir * dist * uHover;

  vec4 tex = texture2D(uTexture, newUv);
  gl_FragColor = tex;
}