import {Game} from "./game.ts"

const PLAYER_SPEED = 10;

abstract class GameObject {
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  public game: Game;
  public visible: boolean = true;

  public constructor(game: Game, width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.game = game;
  }

  abstract update(): void;
}

export class PlayerObject extends GameObject {
  private _speed = PLAYER_SPEED;

  public constructor(game: Game, width: number, height: number, x: number, y: number) {
    super(game, width, height, x, y);
  }

  public update() {
    if (this.game.inputDriver.pressed('w')) {
      this.y -= this._speed;
    }
    if (this.game.inputDriver.pressed('a')) {
      this.x -= this._speed;
    }
    if (this.game.inputDriver.pressed('s')) {
      this.y += this._speed
    }
    if (this.game.inputDriver.pressed('d')) {
      this.x += this._speed;
    }
    console.log(this.x);
  }
}

export class GameState {
  public objects: GameObject[] = [];

  public addObject(object: GameObject) {
    this.objects.push(object);
  }

  public update() {
    this.objects.forEach((object) => {object.update()});
  }
}
