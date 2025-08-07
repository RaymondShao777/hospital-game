import {InputDriver} from "./inputDriver.ts"
import {DisplayDriver} from "./displayDriver.ts"
import {GameState, PlayerObject} from "./gameState.ts"


export class Game {
  // time
  private _start: number;

  // I/O & HUD
  public inputDriver: InputDriver;

  // Animation/display
  public displayDriver: DisplayDriver;

  // Game State
  public gameState: GameState;

  public constructor() {
    this.inputDriver = new InputDriver();
    this.displayDriver = new DisplayDriver(this);
    this.gameState = new GameState();
  }

  public start() {
    this.inputDriver.start();
    //TODO DO THIS PART IN A JSON OR SOMETHING SO ITS NOT INSANE
    this.gameState.addObject(new PlayerObject(this, 100, 100, 500, 500));
    //TODO set fixed framerate
    requestAnimationFrame((t) => {this.update(t)});
  }

  public update(timeStamp: DOMHighResTimeStamp) {
    if (this._start === undefined) {
      this._start = timeStamp;
    }
    this.gameState.update();

    this.displayDriver.draw();
    requestAnimationFrame((t) => {this.update(t)});
  }
}
