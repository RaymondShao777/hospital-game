import {Game} from "./game.ts"
import {SPRITE_MAP} from "./sprites.ts"

const BG_SRC = "../assets/tileset.png";
const bg = await loadImage(BG_SRC) as HTMLImageElement;

const PLAYER_SRC = "../assets/player.png";
const player = await loadImage(PLAYER_SRC) as HTMLImageElement;

export class DisplayDriver {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public game: Game;
  public constructor(game: Game) {
    this.canvas = document.getElementById("2dGame") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.game = game;
  }

  // TODO keep aspect ratio fixed
  public draw() {
    this.resize();
    this.ctx.imageSmoothingEnabled = false;

    // draw bg
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(bg,
      SPRITE_MAP[5].start, SPRITE_MAP[5].offset,
      SPRITE_MAP[5].size, SPRITE_MAP[5].size,
      0, 0, SPRITE_MAP[5].size*2, SPRITE_MAP[5].size*2);

    // draw objects
    this.game.gameState.objects.forEach((object) => {
    console.log(object);
    this.ctx.drawImage(player,
      0, 0, player.width, player.height,
      object.x, object.y, object.width, object.width);});
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

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Image failed to load: ${src}`);
  });
}
