// uniform mat4 projectionMatrix :: 3d를 2d로
// uniform mat4 viewMatrix :: 카메라의 정보를 담음
// uniform mat4 modelMatrix; :: 모델의 정보를 담음
//attribute vec3 position; :: 정점 데이터를 담음
// uniform mat4 modelViewMatrix :: viewMatrix * modelMatrix

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform float uTime;

attribute vec3 position;
attribute float aRandomPosition;
attribute vec2 uv;


varying float vRandomPosition;
varying vec2 vUv;


void main() {
  vec4 modelPosition = modelViewMatrix * vec4(position, 0.1);
  // modelPosition.z += aRandomPosition / uTime;

  vRandomPosition = (aRandomPosition + 1.0) / 2.0;
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}