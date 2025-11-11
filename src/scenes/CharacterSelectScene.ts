import Phaser from 'phaser';
import { ASSET_KEYS, FONT_FAMILY, SCENE_KEYS } from '@config/gameConfig';
import { UIPrimaryButton } from '@utils/UIPrimaryButton';
import SaveStore from '@managers/SaveStore';
import { UIText } from '@utils/UIText';
import { OrientationHandler } from '@utils/OrientationHandler';

export default class CharacterSelectScene extends Phaser.Scene {
  private selected: 1 | 2 = 1;
  private orientationHandler!: OrientationHandler;

  constructor() { super(SCENE_KEYS.CHARACTER_SELECT); }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, ASSET_KEYS.CHAR_BG).setDisplaySize(width, height).setOrigin(0.5);
    new UIText(this, width / 2, height * 0.18, 'Select Your Character', '40px', '#ffffff', '#000', 4, FONT_FAMILY, 0.5, 0.5);

    const c1 = this.add.image(width * 0.4, height * 0.55, ASSET_KEYS.CHAR1).setScale(1);
    const c2 = this.add.image(width * 0.6, height * 0.55, ASSET_KEYS.CHAR2).setScale(0.8);

    const button1 = new UIPrimaryButton(this, c1.x, c1.y + 250, ASSET_KEYS.BLUE_BUTTON, 'Character 1', () => select(1), 240, 100).setTint(0x6ab0ff);
    const button2 = new UIPrimaryButton(this, c2.x, c2.y + 250, ASSET_KEYS.BLUE_BUTTON, 'Character 2', () => select(2), 240, 100).setTint(0x2b334d);

    const select = (id: 1 | 2) => {
      this.selected = id;
      c1.setScale(id === 1 ? 1 : 0.8);
      c2.setScale(id === 2 ? 1 : 0.8);
      button1.setTint(id === 1 ? 0x6ab0ff : 0x2b334d);
      button2.setTint(id === 2 ? 0x6ab0ff : 0x2b334d);
    };

    c1.setInteractive({ useHandCursor: true }).on('pointerdown', () => select(1));
    c2.setInteractive({ useHandCursor: true }).on('pointerdown', () => select(2));

    const playButton = this.add.image(width * 0.8, height * 0.9, ASSET_KEYS.YELLOW_BUTTON);
    playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      SaveStore.save({ selectedCharacter: this.selected });
      this.scene.start(SCENE_KEYS.GAME);
    });
    const playButtonText = new UIText(this, width * 0.8, height * 0.9, 'Play', '32px', '#ffffff', '#000', 4, FONT_FAMILY, 0.5, 0.5);
    playButtonText.setAlign('center');

    // Orientation handler - pause selection screen in portrait mode
    this.orientationHandler = new OrientationHandler(this);
    this.orientationHandler.setup();
  }
}
