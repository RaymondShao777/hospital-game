import {InputDriver} from "./input.ts"

const BG_SRC = "../assets/map.png";
const bg = new Image();
bg.src = BG_SRC;

export class Game {
  // size
  public width: number;
  public height: number;

  // time
  private _start: number;

  // I/O & HUD
  public input: InputDriver;

  // Animation
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public constructor() {
    this.input = new InputDriver();
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  public start() {
    this.input.start();
    //TODO set fixed framerate
    requestAnimationFrame((t) => {this.update(t)});
  }

  public update(timeStamp: DOMHighResTimeStamp) {
    if (this._start === undefined) {
      this._start = timeStamp;
    }
    this.resize();
    console.log('resize');
    this.draw();
    requestAnimationFrame((t) => {this.update(t)});
  }

  // TODO keep aspect ratio fixed
  public draw () {
    this.ctx.drawImage(bg,
      0, 0, bg.width, bg.height,
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  public resize() {
    const screenSize = this.canvas.parentElement!.getBoundingClientRect();
    this.canvas.style.width = `${screenSize.width}px`;
    this.canvas.style.height = `${screenSize.height}px`;
    const scale = window.devicePixelRatio;
    this.canvas.width = Math.floor(screenSize.width * scale);
    this.canvas.height = Math.floor(screenSize.height* scale);
  }
}
