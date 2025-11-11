import { GameObjects, Scene } from 'phaser';

export class UIText extends GameObjects.Text {
  constructor(scene: Scene, x: number, y: number, text: string, fontSize: string = 'calc(100vw / 25)', color: string = '#fff', stroke: string = '#000', strokeThickness: number = 4, fontFamily: string = 'PoppinsRegular', originX: number = 0, originY: number = 0) {
    super(scene, x, y, text, { fontSize, color, stroke, strokeThickness, fontFamily });
    this.setOrigin(originX, originY);
    scene.add.existing(this);
  }
}
