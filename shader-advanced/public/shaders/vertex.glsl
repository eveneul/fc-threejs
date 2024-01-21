// uniform mat4 projectionMatrix :: 3d를 2d로
// uniform mat4 viewMatrix :: 카메라의 정보를 담음
// uniform mat4 modelMatrix; :: 모델의 정보를 담음
//attribute vec3 position; :: 정점 데이터를 담음
// uniform mat4 modelViewMatrix :: viewMatrix * modelMatrix

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.1);
}