const container = document.querySelector(".container");
const canvas = document.createElement("canvas")
canvas.width = 300;
canvas.height = 300;

container.appendChild(canvas);

const gl = canvas.getContext("webgl");

// shader: shade에서 파생, 색의 농도 색조 명암 효과를 준다는 단어에서 파생
// 그래픽 하드웨어의 렌더링 데이터를 계산하는 데에 사용되는 함수

// vertex shader: 정점 셰이더 / 클립 공간에 좌표를 생성
// fragment shader: 색상 셰이더 / 좌표와 좌표 사이에 색상을 생성

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `

attribute vec2 position;
varying vec2 vPosition; 
// fragment shader에 전달할 vPosition 변수 생성

void main () {
  vec2 newPosition = (position + 1.0) / 2.0;
  // position + 1.0 => position은 -1 ~ 1, 1을 더해 주면 0 ~ 2,  여기에서 2를 나눠 주면 0에서 1사이의 값으로 떨어짐


  gl_Position = vec4(position, 0.0, 1.0);

  vPosition = newPosition;
  // 주의 :: position은 -1 ~ 1사이의 값, newPosition은 0에서 1사이의 값
}
`)

gl.compileShader(vertexShader)


const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, `

precision mediump float;
// 색상과 조명 같은 값은 정확도와 성능을 조절하는 데에 영향을 끼침 // mediump => 중간 정도의 정밀도와 성능 제공, 보편적으로 사용

varying vec2 vPosition;
// vertex shader에서 전달받은 vPosition

void main () {
  gl_FragColor = vec4(vPosition, 0.0, 1.0);
}
`)
gl.compileShader(fragmentShader)

// 버텍스 셰이더랑 프래그먼트 셰이더를 연결
const program = gl.createProgram(); // 프로그램을 만들고
gl.attachShader(program, vertexShader) // program과 vertexshader를 연결
gl.attachShader(program, fragmentShader) // program과 fragment shader를 연결

gl.linkProgram(program) // vertex shader, fragment shader 하나로 합치기
gl.useProgram(program)  // 하나로 합친 program을 사용하겠다고 명시해 주기

// 정점 데이터를 선언해 주어야 함 (좌표값이 어디에 있는지)
const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);
// 버텍스 셰이더에 데이터를 넘겨 주기 위해서는 버퍼 데이터로 넘겨 주어야 함
// buffer = gpu에서 사용할 수 있는 데이터를 저장하는 메모리 영역
// webgl에서는 vertex data의 위치, 색상, 텍스트 좌표 등의 정보를 사용하는 데에 사용

const vertexBuffer = gl.createBuffer() // buffer 객체를 생성
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);  // 생성한 버퍼를 gl에 연결, array_buffer는 바인딩할 버퍼의 유형, 배열로 전달
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 바인딩된 버퍼를 전송, 첫 번째 인자 => 전송할 버퍼 유형 (어레이) / 두 번째는 실제 전송할 데이터, 세 번째는 gpu에서 데이터를 어떻게 관리할 건지(STATIC_DRAW는 데이터가 자주 변경되지 않고, 그리기 목적으로 주로 사용될 것임을 알림)

// 정점의 위치를 어떻게 계산할지
const position = gl.getAttribLocation(program, "position") // program에서 특정한 속성의 위치를 찾는 데에 사용, position은 program 내에서 정의된 속성 // 속성의 위치를 나타내는 정수 반환


// vertexAttribPointer:: 정점 속성에 대한 데이터 정보를 webGL에게 전달

gl.vertexAttribPointer(
  position, // 설정할 정점 속성의 위치
  2, // vertices을 두 개씩 끊어서 읽게
  gl.FLOAT, // 데이터 요소의 타입, 여기에서는 실수
  false, // 데이터를 정규화할지에 대한 여부, 이미 데이터가 적절한 형식이면 false,
  0, // 데이터 간의 간격, 연속적인 데이터라면 0
  0 // offset 설정, 처음부터 시작할 거라면 0
)

gl.enableVertexAttribArray(position) // 셰이더에서 이 위치의 정점 데이터를 사용할 준비가 되었다, 렌더링할 때 필수적
gl.drawArrays( // 데이터(어레이)로 데이터 그릴 때
  gl.TRIANGLES, // 삼각형을 그리겠다
  0, // 0번째부터
  6, // 아이템이 6개가 있다
)


