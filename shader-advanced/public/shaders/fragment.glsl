//precision mediump float; 정밀도를 미디엄으로 설정
precision mediump float;

varying float vRandomPosition;


void main() {
  gl_FragColor = vec4(vRandomPosition, vRandomPosition, 1.0, 1.0);
}