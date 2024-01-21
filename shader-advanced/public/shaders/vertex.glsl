// uniform mat4 projectionMatrix :: 3d를 2d로
// uniform mat4 viewMatrix :: 카메라의 정보를 담음
// uniform mat4 modelMatrix; :: 모델의 정보를 담음
//attribute vec3 position; :: 정점 데이터를 담음
// uniform mat4 modelViewMatrix :: viewMatrix * modelMatrix

uniform float uTime;

attribute float aRandomPosition;


varying float vRandomPosition;
varying vec2 vUv;


void main() {
  vec4 modelPosition = modelViewMatrix * vec4(position, 0.1);
  // modelPosition.z += aRandomPosition / 20.0 * sin(uTime);
  // modelPosition.z += sin(uTime + modelPosition.y) / 2.0;

  vRandomPosition = (aRandomPosition + 1.0) / 2.0;
  vRandomPosition /= uTime * 0.3;
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}