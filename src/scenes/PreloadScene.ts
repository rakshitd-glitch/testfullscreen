import { IMAGE_ASSETS, PRELOAD_BAR_OPTIONS, SCENE_KEYS, ATLAS_ASSETS } from '@config/gameConfig';
import Phaser from 'phaser';
import { FONT_FAMILY } from '@config/gameConfig';
import { OrientationHandler } from '@utils/OrientationHandler';

export default class PreloadScene extends Phaser.Scene {
  private bar!: Phaser.GameObjects.Rectangle;
  private barOutline!: Phaser.GameObjects.Rectangle;
  private loadingText!: Phaser.GameObjects.Text;
  private orientationHandler!: OrientationHandler;

  constructor() {
    super(SCENE_KEYS.PRELOAD);
  }

  init(): void {
    const { width, height } = this.scale;
    const barX: number = (width - PRELOAD_BAR_OPTIONS.size.width) / 2;
    const barY: number = (height - PRELOAD_BAR_OPTIONS.size.height) / 2;

    this.barOutline = this.add.rectangle(barX, barY, PRELOAD_BAR_OPTIONS.size.width + 4, PRELOAD_BAR_OPTIONS.size.height + 4, PRELOAD_BAR_OPTIONS.color.container).setStrokeStyle(PRELOAD_BAR_OPTIONS.size.border, PRELOAD_BAR_OPTIONS.color.border).setOrigin(0);

    this.bar = this.add.rectangle(barX + 2, barY + 2, 1, PRELOAD_BAR_OPTIONS.size.height, PRELOAD_BAR_OPTIONS.color.fill);
    this.bar.setOrigin(0);

    this.loadingText = this.add.text(width / 2, barY - 30, 'Loading...', {
      font: `24px ${FONT_FAMILY}`,
      color: '#a8b4ff'
    }).setOrigin(0.5);
    this.loadingText.setDepth(1);

    this.load.on('progress', (progress: number) => {
      this.bar.width = PRELOAD_BAR_OPTIONS.size.width * progress;
    });
    this.load.on('complete', () => {
      this.bar.destroy();
      this.barOutline.destroy();
      this.loadingText.destroy();
      const gameLoadCompleteEvent = new Event("game-load-complete");
      document.dispatchEvent(gameLoadCompleteEvent);
    });
  }

  preload() {
    const allAssetUrls = import.meta.glob('/assets/**/*', {
      eager: true,
      query: '?url',
      import: 'default'
    }) as Record<string, string>;
    const toUrl = (path: string) => {
      const normalized = path.startsWith('/') ? path : `/${path}`;
      return allAssetUrls[normalized] ?? normalized;
    };

    for (const a of IMAGE_ASSETS) {
      this.load.image(a.assetKey, toUrl(a.path));
    }

    for (const a of ATLAS_ASSETS) {
      this.load.atlas(a.assetKey, toUrl(a.texturePath), toUrl(a.atlasPath));
    }

  }

  create() {
    this.orientationHandler = new OrientationHandler(this);
    this.orientationHandler.setup();

    document.addEventListener("game-start", (event: Event) => {
      console.log("Game started event received");
      this.scene.start(SCENE_KEYS.CHARACTER_SELECT);
    });

  }
}
