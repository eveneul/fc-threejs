
precision mediump float;

varying vec2 vUv;

void main() {

  // // 1. 그라데이션
  // float x = vUv.x;
  // float y = vUv.y;

  // float col = x;
  //  // 0에 가까워지면 검은색으로 표시


  // // 2. 대각선 만들기 (y = x)
  // float x = vUv.x;
  // float y = vUv.y;

  // vec3 col = vec3(x);
  // vec3 green = vec3(0.0, 1.0, 0.0);

  // if(y <= x) {
  //   col = green;
  // }; 

  // // 3. 곡선 만들기 (y = x*x)
  // float x = vUv.x * 2.0;
  // float y = vUv.y;

  // vec3 col = vec3(x * x);
  // vec3 green = vec3(0.0, 1.0, 0.0);

  // if(x * x <= y && x * x >= y - 0.005) {
  //   col = green;
  // }; 

  // 4. 곡선 만들기 (y = x*x)
  float x = vUv.x * 2.0;
  float y = vUv.y;

  vec3 col = vec3(x * x);
  vec3 green = vec3(0.0, 1.0, 0.0);

  if(x * x <= y && x * x >= y - 0.005) {
    col = green;
  }; 





  gl_FragColor = vec4(col, 1.0);
}