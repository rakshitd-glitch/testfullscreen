import Phaser from 'phaser';
import { FONT_FAMILY } from '@config/gameConfig';

/**
 * OrientationHandler - Manages landscape orientation locking and portrait warning overlay
 * Call setupOrientationHandler() in scene's create() method
 */
export class OrientationHandler {
  private scene: Phaser.Scene;
  private overlay?: any;
  private wasPortrait: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Sets up orientation detection and creates the warning overlay
   */
  setup() {
    this.createOrientationOverlay();

    this.scene.scale.on('orientationchange', this.handleOrientationChange, this);

    this.handleOrientationChange();
  }

  /**
   * Creates the black overlay with rotation message
   */
  private createOrientationOverlay() {
    let overlayDiv = document.getElementById('orientation-overlay') as HTMLDivElement;

    if (overlayDiv) {
      this.overlay = overlayDiv;
      return;
    }

    overlayDiv = document.createElement('div');
    overlayDiv.id = 'orientation-overlay';
    overlayDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 1);
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 10000;
      color: white;
      font-family: ${FONT_FAMILY}, Arial, sans-serif;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
    `;

    const messageText = document.createElement('div');
    messageText.style.cssText = `
      font-size: clamp(32px, 6vw, 48px);
      font-weight: bold;
      margin-bottom: 20px;
      text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
      line-height: 1.2;
    `;
    messageText.textContent = '📱 Rotate Your Device';

    const subtitleText = document.createElement('div');
    subtitleText.style.cssText = `
      font-size: clamp(20px, 4vw, 32px);
      color: #cccccc;
      margin-bottom: 40px;
      text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
      line-height: 1.3;
      max-width: 90%;
    `;
    subtitleText.textContent = 'Switch to landscape mode to continue';

    const rotationIcon = document.createElement('div');
    rotationIcon.style.cssText = `
      font-size: clamp(60px, 10vw, 90px);
      color: #6ea8ff;
      animation: pulse 1s ease-in-out infinite alternate;
    `;
    rotationIcon.textContent = '↻';

    if (!document.getElementById('orientation-animation-style')) {
      const style = document.createElement('style');
      style.id = 'orientation-animation-style';
      style.textContent = `
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.1); }
        }
      `;
      document.head.appendChild(style);
    }

    overlayDiv.appendChild(messageText);
    overlayDiv.appendChild(subtitleText);
    overlayDiv.appendChild(rotationIcon);

    const gameContainer = document.getElementById('game-container') || document.body;
    gameContainer.appendChild(overlayDiv);

    this.overlay = overlayDiv as any;
  }

  /**
   * Handles orientation change events
   */
  private handleOrientationChange() {
    const isPortrait = this.scene.scale.isPortrait;

    if (isPortrait && !this.wasPortrait) {
      this.showOverlay();
      this.wasPortrait = true;
    } else if (!isPortrait && this.wasPortrait) {
      this.hideOverlay();
      this.wasPortrait = false;
    }
  }

  /**
   * Shows the overlay and pauses the scene
   */
  private showOverlay() {
    if (this.overlay) {
      (this.overlay as HTMLElement).style.display = 'flex';
    }

    this.scene.scene.pause();
  }

  /**
   * Hides the overlay and resumes the scene
   */
  private hideOverlay() {
    if (this.overlay) {
      (this.overlay as HTMLElement).style.display = 'none';
    }

    this.scene.scene.resume();
  }

  /**
   * Cleanup method - call in scene's shutdown/destroy
   * Note: The DOM overlay persists across scenes for consistent UX
   */
  destroy() {
    this.scene.scale.off('orientationchange', this.handleOrientationChange, this);
    if (this.overlay) {
      (this.overlay as HTMLElement).style.display = 'none';
    }
  }
}
