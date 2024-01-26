
uniform sampler2D uTexture;

varying float vRandomPosition;
varying vec2 vUv;
// vUv => 이미지로 된 텍스터를 벡터 형식으로 변환시켜서 FragColor에 넘겨 줘야 함
// uv좌표값을 이용해 이미지를 삼차원 모델링에 입히는 작업
// 

void main() {

  vec4 tex = texture2D(uTexture, vUv);

  gl_FragColor = tex * vRandomPosition; 
}