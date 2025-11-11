import Phaser from 'phaser';
import PreloadScene from '@scenes/PreloadScene';
import GameScene from '@scenes/GameScene';
import CharacterSelectScene from '@scenes/CharacterSelectScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#0e0f14',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 2200 },
      debug: true
    }
  },
  scene: [PreloadScene, CharacterSelectScene, GameScene]
};

new Phaser.Game(config);
