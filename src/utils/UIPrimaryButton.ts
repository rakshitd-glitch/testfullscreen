import Phaser from 'phaser';
import { ASSET_KEYS, FONT_FAMILY } from '@config/gameConfig';
import { UIText } from '@utils/UIText';

export class UIPrimaryButton extends Phaser.GameObjects.Container {
  private btn: Phaser.GameObjects.Image;
  private label: UIText;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    text: string,
    callback: () => void,
    width: number = 100,
    height: number = 100
  ) {
    super(scene, x, y);

    this.btn = scene.add.image(0, 0, texture);
    this.btn.setInteractive({ useHandCursor: true });
    this.btn.setScale(width / this.btn.width, height / this.btn.height);
    this.btn.setOrigin(0.5);

    this.label = new UIText(scene, 0, 0, text, '32px', '#ffffff', '#000', 4, FONT_FAMILY).setOrigin(0.5);

    this.add([this.btn, this.label]);

    this.btn.on('pointerover', () => {
      scene.tweens.add({ targets: this, scale: 1.05, duration: 100 });
    });

    this.btn.on('pointerout', () => {
      scene.tweens.add({ targets: this, scale: 1, duration: 100 });
    });

    this.btn.on('pointerup', () => {
      callback();
    });

    scene.add.existing(this);
  }

  public setText(text: string): this {
    this.label.setText(text);
    return this;
  }

  public setTexture(texture: string): this {
    this.btn.setTexture(texture);
    return this;
  }

  public setTint(tint: number): this {
    this.btn.setTint(tint);
    return this;
  }

  public setEnabled(enabled: boolean): this {
    this.btn.setInteractive(enabled);
    this.setAlpha(enabled ? 1 : 0.5);
    return this;
  }
}
