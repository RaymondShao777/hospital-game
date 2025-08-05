type KeyMap = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}
const KEY_UP = false
const KEY_DOWN = true

export class InputDriver {
  public keyMap: KeyMap = {w: false, a: false, s: false, d: false};

  private _modKey(event: KeyboardEvent, keyPressed: boolean) {
    if (event.key in this.keyMap) {
      this.keyMap[event.key as keyof KeyMap] = keyPressed;
    }
  }

  public setKey(event: KeyboardEvent) {
    this._modKey(event, KEY_DOWN);
  }

  public unsetKey(event: KeyboardEvent) {
    this._modKey(event, KEY_UP);
  }
}
