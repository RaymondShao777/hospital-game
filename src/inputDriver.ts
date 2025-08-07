type KeyMap = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}
const KEY_UP = false;
const KEY_DOWN = true;

export class InputDriver {
  public keyMap: KeyMap = {w: false, a: false, s: false, d: false};

  public start() {
    window.addEventListener("keyup", (e) => {this._unsetKey(e)});
    window.addEventListener("keydown", (e) => {this._setKey(e)});
  }

  public pressed(key: string) {
    if (key in this.keyMap) {
      return this.keyMap[key as keyof KeyMap];
    }
    return false;
  }

  private _modKey(event: KeyboardEvent, keyPressed: boolean) {
    if (event.key in this.keyMap) {
      this.keyMap[event.key as keyof KeyMap] = keyPressed;
    }
  }

  private _setKey(event: KeyboardEvent) {
    this._modKey(event, KEY_DOWN);
  }

  private _unsetKey(event: KeyboardEvent) {
    this._modKey(event, KEY_UP);
  }
}
