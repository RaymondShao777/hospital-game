function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type) as WebGLShader;

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource) as WebGLShader;
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource) as WebGLShader;

  // Create the shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram,
      )}`,
    );
    return null;
  }
  return shaderProgram;
}

export class ShaderProgram {
  public program: WebGLProgram;

  public attribLocations: {
    vertexPosition: GLint;
    textureCoord: GLint;
  }
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    uSampler: WebGLUniformLocation;
  }

  public constructor (gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
    this.program = initShaderProgram(gl, vsSource, fsSource) as WebGLProgram;
    // TODO these can be discovered from source code? don't need to hard code this
    this.attribLocations = {vertexPosition: gl.getAttribLocation(this.program, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(this.program, "aTextureCoord")};
    this.uniformLocations = {projectionMatrix:gl.getUniformLocation(this.program, "uProjectionMatrix") as WebGLUniformLocation,
    modelViewMatrix:gl.getUniformLocation(this.program, "uModelViewMatrix") as WebGLUniformLocation,
    uSampler: gl.getUniformLocation(this.program, "uSampler") as WebGLUniformLocation}
  }
}
