
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

  // // 4. Step
  // float x = vUv.x;
  // float y = vUv.y;


  // float strength = step(0.5, x); 
  // // 0.5는 자르고 싶은 기준 
  // vec3 col = vec3(strength);


  // // 5. min, max (최솟값과 최댓값)
  // float x = vUv.x;
  // float y = vUv.y;


  // // float strength = min(0.5, x); 
  // float strength = max(0.5, x); 
  // vec3 col = vec3(strength);

  // // 5. clamp // 값이 과하게 작아지거나 커지지 않게 
  // float x = vUv.x;
  // float y = vUv.y;



  // float strength = clamp(x, 0.0, 1.0); 
  // // 0.0보다 작아지면 0.0을, 1.0보다 커지면 1.0을 반환
  // // 0보다 작아지고 1보다 커지지 않게

  // vec3 col = vec3(strength);


  // //  6. smoothstep

  // float x = vUv.x;
  // float y = vUv.y;

  // // 컬러값은 0.0보다 작아지거나 1.0보다 커질 수 없다 (clamp로 구현 가능)
  // // x가 0.3일 때는 검정색이어야 한다 => x - 0.3
  // // x가 0.7일 때는 하얀색이어야 한다

  // // y = t * t - (3 - 2t); <= 부드럽게 만들어 주는 수학 계산
  // float strength = smoothstep(0.3, 0.7, x); 
  // vec3 col = vec3(strength);

  // 7.mix:: 두 밸류값을 받아 적절하게 섞어 주는 기능
  // 세 번째로 넘겨 준 숫자값에 따라 첫번째, 두번째 인자를 적절하게 섞어 줌

  float x = vUv.x;
  float y = vUv.y;


  float strength = smoothstep(0.3, 0.7, x); 

  vec3 green = vec3(0.0, 1.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);

  vec3 col = mix(green, blue, x);

  // mix(1.0, 2.0, 0.0) => 0.0
  // mix(1.0, 2.0, 0.25) => 1.25
  // mix(1.0, 2.0, 0.5) => 1.5

  gl_FragColor = vec4(col, 1.0);
}