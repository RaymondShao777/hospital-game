type Sprite = {
  start: number;
  size: number;
  offset: number;
};

const SPRITE_SIZE = 64;

type SPRITE_TILESET = {
  "1": Sprite;
  "2": Sprite;
  "3": Sprite;
  "4": Sprite;
  "5": Sprite;
  "6": Sprite;
  "7": Sprite;
  "8": Sprite;
  "9": Sprite;
}

export const SPRITE_MAP: SPRITE_TILESET = {
  "1": {start: 0, size: SPRITE_SIZE, offset: 0},
  "2": {start: 80, size: SPRITE_SIZE, offset: 0},
  "3": {start: 160, size: SPRITE_SIZE, offset: 0},
  "4": {start: 0, size: SPRITE_SIZE, offset: 80},
  "5": {start: 80, size: SPRITE_SIZE, offset: 80},
  "6": {start: 160, size: SPRITE_SIZE, offset: 80},
  "7": {start: 0, size: SPRITE_SIZE, offset: 160},
  "8": {start: 80, size: SPRITE_SIZE, offset: 160},
  "9": {start: 160, size: SPRITE_SIZE, offset: 160},
}
