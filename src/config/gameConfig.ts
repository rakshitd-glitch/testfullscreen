export const FONT_FAMILY = 'PoppinsRegular';

export const PRELOAD_BAR_OPTIONS = {
  size: {
    width: 200,
    height: 20,
    border: 3,
  },
  color: {
    fill: 0x6ea8ff,
    container: 0x1f2433,
    border: 0x293145
  },
};

export const ASSET_KEYS = Object.freeze({
  // IMAGES
  BLUE_BUTTON: 'BLUE_BUTTON',
  YELLOW_BUTTON: "YELLOW_BUTTON",
  BG_1: 'BG_1',
  BG_2: 'BG_2',
  BG_3: 'BG_3',
  BG_4: 'BG_4',
  BG_5: 'BG_5',
  BG_6: 'BG_6',
  BG_7: 'BG_7',
  BG_8: 'BG_8',
  CHAR_BG: 'CHAR_BG',
  CHAR1: 'CHAR1',
  CHAR2: 'CHAR2',
  OBSTACLE3: 'OBSTACLE3_DODGE',
  JUMP_OBSTACLE_1: 'JUMP_OBSTACLE_1',
  JUMP_OBSTACLE_2: 'JUMP_OBSTACLE_2',
  JUMP_OBSTACLE_3: 'JUMP_OBSTACLE_3',
  JUMP_OBSTACLE_4: 'JUMP_OBSTACLE_4',
  JUMP_OBSTACLE_5: 'JUMP_OBSTACLE_5',
  JUMP_OBSTACLE_6: 'JUMP_OBSTACLE_6',
  JUMP_OBSTACLE_7: 'JUMP_OBSTACLE_7',
  JUMP_OBSTACLE_8: 'JUMP_OBSTACLE_8',
  JUMP_OBSTACLE_9: 'JUMP_OBSTACLE_9',
  JUMP_OBSTACLE_10: 'JUMP_OBSTACLE_10',
  JUMP_OBSTACLE_11: 'JUMP_OBSTACLE_11',
  JUMP_OBSTACLE_12: 'JUMP_OBSTACLE_12',

  ITEM_1: 'ITEM_1',
  ITEM_2: 'ITEM_2',
  ITEM_3: 'ITEM_3',

  // ATLASES
  CHAR1_RUNNING_ATLAS: 'CHAR1_RUNNING_ATLAS',
  CHAR1_SLIDING_ATLAS: 'CHAR1_SLIDING_ATLAS',
  CHAR1_JUMP_ATLAS: 'CHAR1_JUMP_ATLAS',
  CHAR2_RUNNING_ATLAS: 'CHAR2_RUNNING_ATLAS',
  CHAR2_SLIDING_ATLAS: 'CHAR2_SLIDING_ATLAS',
  CHAR2_JUMP_ATLAS: 'CHAR2_JUMP_ATLAS',
});

export const IMAGE_ASSETS = [
  {
    assetKey: ASSET_KEYS.BLUE_BUTTON,
    path: 'assets/images/blue-btn.png'
  },
  {
    assetKey: ASSET_KEYS.YELLOW_BUTTON,
    path: 'assets/images/yellow-btn.png'
  },
  {
    assetKey: ASSET_KEYS.BG_1,
    path: 'assets/images/bg_1.png'
  },
  {
    assetKey: ASSET_KEYS.BG_2,
    path: 'assets/images/bg_2.png'
  },
  {
    assetKey: ASSET_KEYS.BG_3,
    path: 'assets/images/bg_3.png'
  },
  {
    assetKey: ASSET_KEYS.BG_4,
    path: 'assets/images/bg_4.png'
  },
  {
    assetKey: ASSET_KEYS.BG_5,
    path: 'assets/images/bg_5.png'
  },
  {
    assetKey: ASSET_KEYS.BG_6,
    path: 'assets/images/bg_6.png'
  },
  {
    assetKey: ASSET_KEYS.BG_7,
    path: 'assets/images/bg_7.png'
  },
  {
    assetKey: ASSET_KEYS.BG_8,
    path: 'assets/images/bg_8.png'
  },
  {
    assetKey: ASSET_KEYS.CHAR_BG,
    path: 'assets/landingBg.png'
  },
  {
    assetKey: ASSET_KEYS.CHAR1,
    path: 'assets/images/char1.png'
  },
  {
    assetKey: ASSET_KEYS.CHAR2,
    path: 'assets/images/char2.png'
  },
  {
    assetKey: ASSET_KEYS.OBSTACLE3,
    path: 'assets/images/Obstacle3.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_1,
    path: 'assets/images/obstacles/jump-over/jump_1.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_2,
    path: 'assets/images/obstacles/jump-over/jump_2.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_3,
    path: 'assets/images/obstacles/jump-over/jump_3.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_4,
    path: 'assets/images/obstacles/jump-over/jump_4.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_5,
    path: 'assets/images/obstacles/jump-over/jump_5.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_6,
    path: 'assets/images/obstacles/jump-over/jump_6.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_7,
    path: 'assets/images/obstacles/jump-over/jump_7.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_8,
    path: 'assets/images/obstacles/jump-over/jump_8.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_9,
    path: 'assets/images/obstacles/jump-over/jump_9.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_10,
    path: 'assets/images/obstacles/jump-over/jump_10.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_11,
    path: 'assets/images/obstacles/jump-over/jump_11.png'
  },
  {
    assetKey: ASSET_KEYS.JUMP_OBSTACLE_12,
    path: 'assets/images/obstacles/jump-over/jump_12.png'
  },
  {
    assetKey: ASSET_KEYS.ITEM_1,
    path: 'assets/images/Items/item_1.png'
  },
  {
    assetKey: ASSET_KEYS.ITEM_2,
    path: 'assets/images/Items/item_2.png'
  },
  {
    assetKey: ASSET_KEYS.ITEM_3,
    path: 'assets/images/Items/item_3.png'
  },
];


export const ATLAS_ASSETS = [
  {
    assetKey: ASSET_KEYS.CHAR1_RUNNING_ATLAS,
    texturePath: 'assets/sprites/char1/run.png',
    atlasPath: 'assets/sprites/char1/run.json',
  },
  {
    assetKey: ASSET_KEYS.CHAR1_SLIDING_ATLAS,
    texturePath: 'assets/sprites/char1/slide.png',
    atlasPath: 'assets/sprites/char1/slide.json',
  },
  {
    assetKey: ASSET_KEYS.CHAR1_JUMP_ATLAS,
    texturePath: 'assets/sprites/char1/jump.png',
    atlasPath: 'assets/sprites/char1/jump.json',
  },
  {
    assetKey: ASSET_KEYS.CHAR2_RUNNING_ATLAS,
    texturePath: 'assets/sprites/char2/run.png',
    atlasPath: 'assets/sprites/char2/run.json',
  },
  {
    assetKey: ASSET_KEYS.CHAR2_SLIDING_ATLAS,
    texturePath: 'assets/sprites/char2/slide.png',
    atlasPath: 'assets/sprites/char2/slide.json',
  },
  {
    assetKey: ASSET_KEYS.CHAR2_JUMP_ATLAS,
    texturePath: 'assets/sprites/char2/jump.png',
    atlasPath: 'assets/sprites/char2/jump.json',
  },
];

export const ANIM_KEYS = Object.freeze({
  CHAR1_RUN: 'CHAR1_RUN',
  CHAR1_SLIDE: 'CHAR1_SLIDE',
  CHAR1_JUMP: 'CHAR1_JUMP',
  CHAR2_RUN: 'CHAR2_RUN',
  CHAR2_SLIDE: 'CHAR2_SLIDE',
  CHAR2_JUMP: 'CHAR2_JUMP',
});

export const SCENE_KEYS = Object.freeze({
  PRELOAD: 'Preload',
  MENU: 'Menu',
  CHARACTER_SELECT: 'CharacterSelect',
  GAME: 'Game',
});
