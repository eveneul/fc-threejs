uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;

attribute vec3 position;
attribute float aRandomPosition;

varying float vRandomPosition;

void main () {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += aRandomPosition * uTime;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vRandomPosition = (aRandomPosition + 1.0) / 2.0;
}

//  uniform mat4 projectionMatrix; 
//     // 카메라 객체에서 넘겨주는 데이터

//     uniform mat4 viewMatrix;
//     // 모델이 그려지기 전에 카메라가 물체를 어떻게 바라보고 있는지 정보를 세팅, 카메라의 위치 회전 종횡비 어디까지 포착할 건지의 대한 정보를 담고 있음

//     uniform mat4 modelMatrix;
//     // trasfomation 정보

//     attribute vec3 position; 
//     // x, y, z 값을 가지고 있는 buffer 정보

//     void main() {
//       gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
//       // 카메라와 모델의 정보
//       // 1.0은 원근값에 대한 정보
//     }