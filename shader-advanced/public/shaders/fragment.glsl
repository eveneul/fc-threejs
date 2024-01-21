//precision mediump float; 정밀도를 미디엄으로 설정

uniform sampler2D uTexture;

varying float vRandomPosition;
varying vec2 vUv;



void main() {

  vec4 tex = texture2D(uTexture, vUv);

  gl_FragColor = tex;
}