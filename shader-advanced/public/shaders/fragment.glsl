precision mediump float;

varying vec2 uUv;

void main()
{

  // // 1. 그라데이션
  // float x = uUv.x;
  // float y = uUv.y;

  // float col = x;

  // gl_FragColor = vec4(col, col, col, 1.0);

  // // 2. 대각선 그라데이션
  // float x = uUv.x;
  // float y = uUv.y;

  // vec3 col = vec3(x);
  // vec3 green = vec3(0.0, 1.0, 0.0);

  // if(y <= x + 0.005 && y + 0.005 >= x) {
  //   col = green;
  // };

  // gl_FragColor = vec4(col, 1.0);

  // 3. 곡선 그라데이션
  float x = uUv.x;
  float y = uUv.y;

  vec3 col = vec3(x);
  vec3 green = vec3(0.0, 1.0, 0.0);

  if(x * x <= y) {
    col = green;
  };

  gl_FragColor = vec4(col, 1.0);
}