import {ShaderProgram} from "./shaders.ts"
import {initBuffers} from "./init-buffers.ts"
import {drawScene} from "./draw-scene.ts"

const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

function main() {
  const canvas = document.getElementById("3dGame") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const shaderProgram = new ShaderProgram(gl, vsSource, fsSource) as ShaderProgram;
  const buffers = initBuffers(gl);

  // Draw the scene
  drawScene(gl, shaderProgram, buffers);
}

main();
