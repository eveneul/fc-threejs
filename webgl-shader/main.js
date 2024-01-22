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


`)

gl.compileShader(vertexShader)


const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, ``)
gl.compileShader(frameElement)

// 버텍스 셰이더랑 프래그먼트 셰이더를 연결
const program = gl.createProgram();
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

gl.linkProgram(program)
gl.useProgram(program)