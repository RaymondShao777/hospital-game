import {InputDriver} from "./input.ts"

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const draw = () => {
  ctx.drawImage(bg,
    0, 0, bg.width, bg.height,
    0, 0, ctx.canvas.width, ctx.canvas.height);
}

const resize = () => {
  const screenSize = canvas.parentElement!.getBoundingClientRect();
  canvas.style.width = `${screenSize.width}px`;
  canvas.style.height = `${screenSize.height}px`;
}

// shit starter code for now 
const input = new InputDriver();
window.addEventListener("keyup", (e) => {input.unsetKey(e)});
window.addEventListener("keydown", (e) => {input.setKey(e)});

const BG_SRC = "../assets/map.png";
const bg = new Image();
bg.src = BG_SRC;
bg.onload = () => {
  draw();
}

resize();
window.addEventListener("resize", resize);
