import {ShaderProgram} from "./shaders.ts"
import {initBuffers} from "./init-buffers.ts"
import {drawScene} from "./draw-scene.ts"
import {loadTexture} from "./texture.ts"

const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec2 vTextureCoord;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

const fsSource = `
    varying lowp vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

function main() {
  const canvas = document.getElementById("3dGame") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const shaderProgram = new ShaderProgram(gl, vsSource, fsSource) as ShaderProgram;
  const buffers = initBuffers(gl);

  // Load texture
  const texture = loadTexture(gl, "../assets/player.png");
  // Flip image pixels into the bottom-to-top order that WebGL expects.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  let cubeRotation = 0.0;
  let deltaTime = 0;

  let then = 0;

  // Draw the scene repeatedly
  function render(now: number) {
    now *= 0.001; // convert to seconds
    deltaTime = now - then;
    then = now;

    drawScene(gl, shaderProgram, buffers, texture, cubeRotation);
    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

main();
