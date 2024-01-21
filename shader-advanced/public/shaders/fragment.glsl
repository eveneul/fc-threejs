//precision mediump float; 정밀도를 미디엄으로 설정

uniform sampler2D uTexture;

in float vRandomPosition;
in vec2 vUv;

out vec4 myFragColor;

void main() {

  vec4 tex = texture(uTexture, vUv);

  myFragColor = tex * vRandomPosition;
}