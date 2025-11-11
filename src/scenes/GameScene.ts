import Phaser from 'phaser';
import SaveStore from '@managers/SaveStore';
import { ASSET_KEYS, FONT_FAMILY, SCENE_KEYS, ANIM_KEYS } from '@config/gameConfig';
import { UIText } from '@utils/UIText';
import { UIPrimaryButton } from '@utils/UIPrimaryButton';
import { OrientationHandler } from '@utils/OrientationHandler';
import { ReplayRecorder } from '@systems/ReplayRecorder';
import { SeededRandom, generateSeed } from '@utils/SeededRandom';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME);
  }

  private player!: Phaser.Physics.Arcade.Sprite;
  private rival!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private running: boolean = false;
  private distance: number = 0;
  private distanceRate: number = 0.01;
  private scoreText!: Phaser.GameObjects.Text;
  private countdownText!: Phaser.GameObjects.Text;
  private groundY = 1000;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private items!: Phaser.Physics.Arcade.Group;
  private worldSpeed: number = 480;
  private bgImages: Phaser.GameObjects.Image[] = [];
  private itemCollected: number = 0;
  private selected: 1 | 2 = 1;
  private playerAnims!: { run: string; slide: string; jump: string };
  private rivalAnims!: { run: string; slide: string; jump: string };
  private playerAtlas!: { run: string; slide: string; jump: string };
  private rivalAtlas!: { run: string; slide: string; jump: string };
  private gameOverUI?: Phaser.GameObjects.Container;
  private isAnimationLocked: boolean = false;
  private isRivalAnimationLocked: boolean = false;
  private lastObstacleType: 'jump' | 'slide' | null = null;
  private spawnTimer = 0;
  private touchStartY: number = 0;
  private touchStartTime: number = 0;
  private orientationHandler!: OrientationHandler;
  private worldDistance: number = 0;
  private rivalWorldDistance: number = 0;
  private rivalDelayDistance: number = 200;
  private replayRecorder!: ReplayRecorder;
  private seededRandom!: SeededRandom;
  private queuedAction: 'slide' | 'jump' | null = null;
  private queuedActionTime: number = 0;
  private rivalQueuedAction: 'slide' | 'jump' | null = null;
  private rivalQueuedActionTime: number = 0;
  private readonly QUEUE_TIMEOUT = 2000;
  private lastProcessedRivalActionIndex: number = -1;
  private itemSpawnTimer: number = 0;
  private lastItemSpawnDistance: number = -1000;
  private lastObstacleSpawnDistance: number = -1000;

  create() {
    const { width, height } = this.scale;
    const store = SaveStore.load();
    this.selected = store.selectedCharacter ?? 1;

    if (this.selected === 1) {
      this.playerAtlas = {
        run: ASSET_KEYS.CHAR1_RUNNING_ATLAS,
        slide: ASSET_KEYS.CHAR1_SLIDING_ATLAS,
        jump: ASSET_KEYS.CHAR1_JUMP_ATLAS
      };
      this.playerAnims = {
        run: ANIM_KEYS.CHAR1_RUN,
        slide: ANIM_KEYS.CHAR1_SLIDE,
        jump: ANIM_KEYS.CHAR1_JUMP
      };
      this.rivalAtlas = {
        run: ASSET_KEYS.CHAR2_RUNNING_ATLAS,
        slide: ASSET_KEYS.CHAR2_SLIDING_ATLAS,
        jump: ASSET_KEYS.CHAR2_JUMP_ATLAS
      };
      this.rivalAnims = {
        run: ANIM_KEYS.CHAR2_RUN,
        slide: ANIM_KEYS.CHAR2_SLIDE,
        jump: ANIM_KEYS.CHAR2_JUMP
      };
    } else {
      this.playerAtlas = {
        run: ASSET_KEYS.CHAR2_RUNNING_ATLAS,
        slide: ASSET_KEYS.CHAR2_SLIDING_ATLAS,
        jump: ASSET_KEYS.CHAR2_JUMP_ATLAS
      };
      this.playerAnims = {
        run: ANIM_KEYS.CHAR2_RUN,
        slide: ANIM_KEYS.CHAR2_SLIDE,
        jump: ANIM_KEYS.CHAR2_JUMP
      };
      this.rivalAtlas = {
        run: ASSET_KEYS.CHAR1_RUNNING_ATLAS,
        slide: ASSET_KEYS.CHAR1_SLIDING_ATLAS,
        jump: ASSET_KEYS.CHAR1_JUMP_ATLAS
      };
      this.rivalAnims = {
        run: ANIM_KEYS.CHAR1_RUN,
        slide: ANIM_KEYS.CHAR1_SLIDE,
        jump: ANIM_KEYS.CHAR1_JUMP
      };
    }

    this.seededRandom = new SeededRandom(generateSeed());
    this.replayRecorder = new ReplayRecorder();
    this.replayRecorder.startRecording();
    this.rivalWorldDistance = 0;
    this.lastProcessedRivalActionIndex = -1;

    this.createAnimations();

    const bgKeys = [
      ASSET_KEYS.BG_1, ASSET_KEYS.BG_2, ASSET_KEYS.BG_3, ASSET_KEYS.BG_4,
      ASSET_KEYS.BG_5, ASSET_KEYS.BG_6, ASSET_KEYS.BG_7, ASSET_KEYS.BG_8
    ];

    let currentX = 0;
    for (let i = 0; i < bgKeys.length; i++) {
      const bg = this.add.image(currentX, 0, bgKeys[i])
        .setOrigin(0, 0)
        .setDisplaySize(height * (this.textures.get(bgKeys[i]).getSourceImage().width / this.textures.get(bgKeys[i]).getSourceImage().height), height);

      this.bgImages.push(bg);
      currentX += bg.displayWidth;
    }

    const playerInitialFrame = this.selected === 1 ? '200' : '172';
    const rivalInitialFrame = this.selected === 1 ? '172' : '200';

    this.player = this.physics.add.sprite(width * 0.25, this.groundY, this.playerAtlas.run, playerInitialFrame).setOrigin(0.5, 1).setCollideWorldBounds(true);
    this.rival = this.physics.add.sprite(this.player.x - 350, this.groundY, this.rivalAtlas.run, rivalInitialFrame).setOrigin(0.5, 1).setCollideWorldBounds(true);

    this.player.setScale(0.5);
    this.rival.setScale(0.5);

    this.player.body?.setSize(300, 400).setOffset(100, 65);
    this.rival.body?.setSize(300, 400).setOffset(100, 65);

    this.player.setGravityY(2200);
    this.rival.setGravityY(2200);

    this.player.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
      this.isAnimationLocked = false;
      if (anim.key === this.playerAnims.slide) {
        const onGround = (this.player.body as Phaser.Physics.Arcade.Body).blocked.down;
        if (onGround) {
          this.player.setScale(0.5);
          const body = this.player.body as Phaser.Physics.Arcade.Body;
          body.setSize(300, 400).setOffset(100, 65);

          this.replayRecorder.recordAction(this.worldDistance, 'slide_off');

          if (this.queuedAction === 'jump') {
            this.queuedAction = null;
            this.performJump();
          } else {
            this.player.play(this.playerAnims.run, true);
          }
        }
      } else if (anim.key === this.playerAnims.jump) {
        const onGround = (this.player.body as Phaser.Physics.Arcade.Body).blocked.down;
        if (!onGround) {
          this.player.anims.playReverse(this.playerAnims.jump, true);
        }
      }
    });

    this.rival.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
      this.isRivalAnimationLocked = false;
      if (anim.key === this.rivalAnims.slide) {
        const onGround = (this.rival.body as Phaser.Physics.Arcade.Body).blocked.down;
        if (onGround) {
          this.rival.setScale(0.5);
          const body = this.rival.body as Phaser.Physics.Arcade.Body;
          body.setSize(300, 400).setOffset(100, 65);

          if (this.rivalQueuedAction === 'jump') {
            this.rivalQueuedAction = null;
            this.rivalPerformJump();
          } else {
            this.rival.play(this.rivalAnims.run, true);
          }
        }
      } else if (anim.key === this.rivalAnims.jump) {
        const onGround = (this.rival.body as Phaser.Physics.Arcade.Body).blocked.down;
        if (!onGround) {
          this.rival.anims.playReverse(this.rivalAnims.jump, true);
        }
      }
    });

    const floor = this.add.rectangle(0, this.groundY + 2, width * 2, 10, 0x000000, 0);
    this.physics.add.existing(floor, true);
    this.physics.add.collider(this.player, floor as any);
    this.physics.add.collider(this.rival, floor as any);

    this.obstacles = this.physics.add.group({ allowGravity: false });
    this.items = this.physics.add.group({ allowGravity: false });

    this.physics.add.overlap(this.player, this.items, (_p, o) => {
      o.destroy();
      this.itemCollected += 10;
    });

    this.physics.add.overlap(this.player, this.obstacles, () => {
      if (!this.running) return;
      this.running = false;
      this.endGame();
    });

    this.scoreText = new UIText(this, width / 2, 100, 'Score\n0', '56px', '#ffffff', '#000', 4, FONT_FAMILY).setOrigin(0.5, 0.5);
    this.scoreText.setAlign('center');
    this.countdownText = new UIText(this, width / 2, height * 0.35, '', '98px', '#ffffff', '#000', 4, FONT_FAMILY).setOrigin(0.5, 0.5);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.input.keyboard!.addCapture('UP,DOWN');

    this.setupTouchControls();

    this.orientationHandler = new OrientationHandler(this);
    this.orientationHandler.setup();

    this.startCountdown();
  }

  private setupTouchControls() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.touchStartY = pointer.y;
      this.touchStartTime = this.time.now;
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (!this.running) return;

      const deltaY = pointer.y - this.touchStartY;
      const deltaTime = this.time.now - this.touchStartTime;
      const minSwipeDistance = 50;
      const maxSwipeTime = 300;

      if (Math.abs(deltaY) >= minSwipeDistance && deltaTime <= maxSwipeTime) {
        const onGround = (this.player.body as Phaser.Physics.Arcade.Body).blocked.down;

        if (deltaY < 0) {
          if (onGround && !this.isAnimationLocked) {
            this.performJump();
          } else if (this.isAnimationLocked || !onGround) {
            this.queuedAction = 'jump';
            this.queuedActionTime = this.time.now;
          }
        }
        else if (deltaY > 0) {
          if (onGround && !this.isAnimationLocked) {
            this.performSlide();
          } else if (!onGround || this.isAnimationLocked) {
            this.queuedAction = 'slide';
            this.queuedActionTime = this.time.now;
          }
        }
      }
    });
  }

  private startCountdown() {
    const seq = ['3', '2', '1', 'GO!', ''];
    let i = 0;
    const t = this.time.addEvent({
      delay: 700,
      repeat: seq.length - 1,
      callback: () => {
        this.countdownText.setText(seq[i]);
        i++;
        if (i >= seq.length) {
          this.countdownText.setText('');
          t.remove(false);
          this.running = true;

          this.player.play(this.playerAnims.run);
          this.rival.play(this.rivalAnims.run);
        }
      }
    });
  }

  private performJump() {
    this.isAnimationLocked = true;
    this.player.setVelocityY(-1750);
    this.player.play(this.playerAnims.jump, true);
    this.replayRecorder.recordAction(this.worldDistance, 'jump');
  }

  private performSlide() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    this.isAnimationLocked = true;
    this.player.play(this.playerAnims.slide, true);
    body.setSize(280, 140).setOffset(100, 325);
    this.replayRecorder.recordAction(this.worldDistance, 'slide_on');
  }

  private rivalPerformJump() {
    if (this.isRivalAnimationLocked) return;
    this.isRivalAnimationLocked = true;
    this.rival.setVelocityY(-1750);
    this.rival.play(this.rivalAnims.jump, true);
  }

  private rivalPerformSlide() {
    if (this.isRivalAnimationLocked) return;
    const body = this.rival.body as Phaser.Physics.Arcade.Body;
    this.isRivalAnimationLocked = true;
    this.rival.play(this.rivalAnims.slide, true);
    body.setSize(280, 140).setOffset(100, 325);
  }

  private rivalStopSlide() {
    if (!this.isRivalAnimationLocked) return;
    this.isRivalAnimationLocked = false;
    const onGround = (this.rival.body as Phaser.Physics.Arcade.Body).blocked.down;
    if (onGround) {
      this.rival.play(this.rivalAnims.run, true);
      this.rival.setScale(0.5);
      const body = this.rival.body as Phaser.Physics.Arcade.Body;
      body.setSize(300, 400).setOffset(100, 65);
    }
  }

  update(_time: number, delta: number) {
    const dt = delta / 1000;
    if (this.running) {
      const scrollAmount = this.worldSpeed * dt;

      this.bgImages.forEach((bg) => {
        bg.x -= scrollAmount;

        if (bg.x + bg.displayWidth < 0) {
          const rightmostBg = this.bgImages.reduce((max, b) => b.x > max.x ? b : max);
          bg.x = rightmostBg.x + rightmostBg.displayWidth;
        }
      });

      this.worldDistance += this.worldSpeed * dt;

      const spatialOffset = this.player.x - this.rival.x;
      this.rivalWorldDistance = this.worldDistance - spatialOffset;

      this.distance += this.worldSpeed * dt;
      const score = Math.floor(this.distance * this.distanceRate) + this.itemCollected;
      this.scoreText.setText(`Score\n${score}`);

      const currentRecording = this.replayRecorder.getReplayData();
      const distanceThisFrame = this.worldSpeed * dt;

      const lookAheadWindow = Math.max(50, distanceThisFrame * 1.5);

      for (let i = this.lastProcessedRivalActionIndex + 1; i < currentRecording.actions.length; i++) {
        const action = currentRecording.actions[i];

        if (action.d > this.rivalWorldDistance + lookAheadWindow) {
          break;
        }

        this.lastProcessedRivalActionIndex = i;

        const rivalOnGround = (this.rival.body as Phaser.Physics.Arcade.Body).blocked.down;
        switch (action.type) {
          case 'jump':
            if (rivalOnGround && !this.isRivalAnimationLocked) {
              this.rivalPerformJump();
            } else if (this.isRivalAnimationLocked || !rivalOnGround) {
              this.rivalQueuedAction = 'jump';
              this.rivalQueuedActionTime = this.time.now;
            }
            break;
          case 'slide_on':
            if (rivalOnGround && !this.isRivalAnimationLocked) {
              this.rivalPerformSlide();
            } else if (this.isRivalAnimationLocked || !rivalOnGround) {
              this.rivalQueuedAction = 'slide';
              this.rivalQueuedActionTime = this.time.now;
            }
            break;
          case 'slide_off':
            this.rivalStopSlide();
            break;
        }
      }

      this.rival.x = Phaser.Math.Linear(this.rival.x, this.player.x - 350, 0.05);

      const onGround = (this.player.body as Phaser.Physics.Arcade.Body).blocked.down;
      const body = this.player.body as Phaser.Physics.Arcade.Body;

      if (this.queuedAction && this.time.now - this.queuedActionTime > this.QUEUE_TIMEOUT) {
        this.queuedAction = null;
      }

      if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
        if (onGround && !this.isAnimationLocked) {
          this.performJump();
        } else if (this.isAnimationLocked || !onGround) {
          this.queuedAction = 'jump';
          this.queuedActionTime = this.time.now;
        }
      }

      if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {
        if (onGround && !this.isAnimationLocked) {
          this.performSlide();
        } else if (!onGround || this.isAnimationLocked) {
          this.queuedAction = 'slide';
          this.queuedActionTime = this.time.now;
        }
      }

      if (onGround && !this.isAnimationLocked) {
        if (this.queuedAction === 'slide') {
          this.queuedAction = null;
          this.performSlide();
        } else if (this.queuedAction === 'jump') {
          this.queuedAction = null;
          this.performJump();
        } else if (this.player.anims.currentAnim?.key !== this.playerAnims.run) {
          this.isAnimationLocked = false;
          this.player.play(this.playerAnims.run, true);
          this.player.setScale(0.5);
          body.setSize(300, 400).setOffset(100, 65);
        }
      } else if (this.isAnimationLocked && this.cursors.down!.isDown) {
        body.setSize(280, 140).setOffset(100, 325);
      }

      const rivalOnGround = (this.rival.body as Phaser.Physics.Arcade.Body).blocked.down;

      if (this.rivalQueuedAction && this.time.now - this.rivalQueuedActionTime > this.QUEUE_TIMEOUT) {
        this.rivalQueuedAction = null;
      }

      if (rivalOnGround && !this.isRivalAnimationLocked) {
        if (this.rivalQueuedAction === 'slide') {
          this.rivalQueuedAction = null;
          this.rivalPerformSlide();
        } else if (this.rivalQueuedAction === 'jump') {
          this.rivalQueuedAction = null;
          this.rivalPerformJump();
        } else if (this.rival.anims.currentAnim?.key !== this.rivalAnims.run) {
          this.isRivalAnimationLocked = false;
          this.rival.play(this.rivalAnims.run, true);
          this.rival.setScale(0.5);
          const rivalBody = this.rival.body as Phaser.Physics.Arcade.Body;
          rivalBody.setSize(300, 400).setOffset(100, 65);
        }
      }

      this.trySpawn(delta);
      this.trySpawnItem(delta);

      this.obstacles.children.iterate((child: Phaser.GameObjects.GameObject) => {
        if (!(child instanceof Phaser.Physics.Arcade.Sprite)) return true;
        (child as Phaser.Physics.Arcade.Sprite).x -= this.worldSpeed * dt;
        if ((child as Phaser.Physics.Arcade.Sprite).x < -100) child.destroy();
        return true;
      });
      this.items.children.iterate((child: Phaser.GameObjects.GameObject) => {
        if (!(child instanceof Phaser.Physics.Arcade.Sprite)) return true;
        (child as Phaser.Physics.Arcade.Sprite).x -= this.worldSpeed * dt;
        if ((child as Phaser.Physics.Arcade.Sprite).x < -100) child.destroy();
        return true;
      });
    }
  }

  private createAnimations() {
    if (!this.anims.exists(ANIM_KEYS.CHAR1_RUN)) {
      const char1RunFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      for (let i = 200; i <= 211; i++) {
        char1RunFrames.push({ key: ASSET_KEYS.CHAR1_RUNNING_ATLAS, frame: i.toString() });
      }
      this.anims.create({
        key: ANIM_KEYS.CHAR1_RUN,
        frames: char1RunFrames,
        frameRate: 20,
        repeat: -1
      });
    }

    if (!this.anims.exists(ANIM_KEYS.CHAR1_SLIDE)) {
      const char1SlideFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      for (let i = 212; i <= 236; i++) {
        char1SlideFrames.push({ key: ASSET_KEYS.CHAR1_SLIDING_ATLAS, frame: i.toString() });
      }
      this.anims.create({
        key: ANIM_KEYS.CHAR1_SLIDE,
        frames: char1SlideFrames,
        frameRate: 20,
        repeat: 0
      });
    }

    if (!this.anims.exists(ANIM_KEYS.CHAR1_JUMP)) {
      const char1JumpFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      for (let i = 185; i <= 199; i++) {
        char1JumpFrames.push({ key: ASSET_KEYS.CHAR1_JUMP_ATLAS, frame: i.toString() });
      }
      this.anims.create({
        key: ANIM_KEYS.CHAR1_JUMP,
        frames: char1JumpFrames,
        frameRate: 24,
        repeat: 0
      });
    }

    if (!this.anims.exists(ANIM_KEYS.CHAR2_RUN)) {
      const char2RunFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      for (let i = 241; i <= 251; i++) {
        char2RunFrames.push({ key: ASSET_KEYS.CHAR2_RUNNING_ATLAS, frame: i.toString() });
      }
      this.anims.create({
        key: ANIM_KEYS.CHAR2_RUN,
        frames: char2RunFrames,
        frameRate: 20,
        repeat: -1
      });
    }

    if (!this.anims.exists(ANIM_KEYS.CHAR2_SLIDE)) {
      const char2SlideFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      for (let i = 133; i <= 156; i++) {
        char2SlideFrames.push({ key: ASSET_KEYS.CHAR2_SLIDING_ATLAS, frame: i.toString() });
      }
      this.anims.create({
        key: ANIM_KEYS.CHAR2_SLIDE,
        frames: char2SlideFrames,
        frameRate: 20,
        repeat: 0
      });
    }

    if (!this.anims.exists(ANIM_KEYS.CHAR2_JUMP)) {
      const char2JumpFrames: Phaser.Types.Animations.AnimationFrame[] = [];
      for (let i = 157; i <= 171; i++) {
        char2JumpFrames.push({ key: ASSET_KEYS.CHAR2_JUMP_ATLAS, frame: i.toString() });
      }
      this.anims.create({
        key: ANIM_KEYS.CHAR2_JUMP,
        frames: char2JumpFrames,
        frameRate: 24,
        repeat: 0
      });
    }
  }

  private trySpawn(delta: number) {
    this.spawnTimer += delta;

    const score = Math.floor(this.distance * this.distanceRate);

    let baseInterval: number;
    if (score < 20) {
      baseInterval = 3500;
    } else if (score < 100) {
      baseInterval = 2800;
    } else if (score < 200) {
      baseInterval = 2400;
    } else if (score < 400) {
      baseInterval = 2100;
    } else {
      baseInterval = 1900;
    }

    const variation = this.seededRandom.between(-200, 300);
    const interval = Math.max(1800, baseInterval + variation);

    const minIntervalDuringAnimation = 2200;
    const effectiveInterval = this.isAnimationLocked ? Math.max(interval, minIntervalDuringAnimation) : interval;

    if (this.spawnTimer >= effectiveInterval) {
      this.spawnTimer = 0;

      this.spawnObstacle();
    }
  }

  private spawnObstacle() {
    const spawnX = this.scale.width + 60;
    let obstacleType: 'jump' | 'slide';

    if (this.lastObstacleType === null) {
      obstacleType = 'jump';
    } else {
      if (this.seededRandom.next() < 0.7) {
        obstacleType = this.lastObstacleType === 'jump' ? 'slide' : 'jump';
      } else {
        obstacleType = this.lastObstacleType;
      }
    }

    this.lastObstacleType = obstacleType;
    this.lastObstacleSpawnDistance = this.worldDistance;

    if (obstacleType === 'jump') {
      const jumpObstacles = [
        ASSET_KEYS.JUMP_OBSTACLE_1,
        ASSET_KEYS.JUMP_OBSTACLE_2,
        ASSET_KEYS.JUMP_OBSTACLE_3,
        ASSET_KEYS.JUMP_OBSTACLE_4,
        ASSET_KEYS.JUMP_OBSTACLE_5,
        ASSET_KEYS.JUMP_OBSTACLE_6,
        ASSET_KEYS.JUMP_OBSTACLE_7,
        ASSET_KEYS.JUMP_OBSTACLE_8,
        ASSET_KEYS.JUMP_OBSTACLE_9,
        ASSET_KEYS.JUMP_OBSTACLE_10,
        ASSET_KEYS.JUMP_OBSTACLE_11,
        ASSET_KEYS.JUMP_OBSTACLE_12,
      ];
      const obstacleKey = this.seededRandom.pick(jumpObstacles);
      const obstacle = this.obstacles.create(spawnX, this.groundY, obstacleKey) as Phaser.Physics.Arcade.Sprite;
      obstacle.setOrigin(0.5, 1);
      obstacle.setDisplaySize(150, 150);
      const body = obstacle.body as Phaser.Physics.Arcade.Body;
      body.setSize(150, 350).setOffset(75, 75);

      const minItemSpacing = 600;
      if (this.seededRandom.next() < 0.4 && (this.worldDistance - this.lastItemSpawnDistance) >= minItemSpacing) {
        this.spawnItem(spawnX + 250, this.groundY - 280);
        this.itemSpawnTimer = 0;
      }
    } else {
      const obstacle = this.obstacles.create(spawnX, this.groundY - 150, ASSET_KEYS.OBSTACLE3) as Phaser.Physics.Arcade.Sprite;
      obstacle.setOrigin(0.5, 0.5);
      obstacle.setDisplaySize(250, 250);
      obstacle.setScale(0.5);
      const body = obstacle.body as Phaser.Physics.Arcade.Body;
      body.setSize(350, 230).setOffset(25, 80);

      const minItemSpacing = 600;
      if (this.seededRandom.next() < 0.4 && (this.worldDistance - this.lastItemSpawnDistance) >= minItemSpacing) {
        this.spawnItem(spawnX + 250, this.groundY - 50);
        this.itemSpawnTimer = 0;
      }
    }
  }

  private trySpawnItem(delta: number) {
    this.itemSpawnTimer += delta;

    // Spawn items randomly every 2-4 seconds
    const baseItemInterval = 3000;
    const variation = this.seededRandom.between(-500, 1500);
    const itemInterval = Math.max(2000, baseItemInterval + variation);

    if (this.itemSpawnTimer >= itemInterval) {
      this.itemSpawnTimer = 0;

      const spawnX = this.scale.width + 60;

      const minItemToItemSpacing = 500;
      const minItemToObstacleSpacing = 700;

      const distanceFromLastItem = this.worldDistance - this.lastItemSpawnDistance;
      const distanceFromLastObstacle = this.worldDistance - this.lastObstacleSpawnDistance;

      const hasItemSpacing = distanceFromLastItem >= minItemToItemSpacing;
      const hasObstacleSpacing = distanceFromLastObstacle >= minItemToObstacleSpacing;

      if (hasItemSpacing && hasObstacleSpacing) {
        const rand = this.seededRandom.next();
        let spawnY: number;

        if (rand < 0.3) {
          spawnY = this.groundY - 50;
        } else if (rand < 0.6) {
          spawnY = this.groundY - 180;
        } else {
          spawnY = this.groundY - 280;
        }

        this.spawnItem(spawnX, spawnY);
      }
    }
  }

  private spawnItem(x: number, y: number) {
    const itemKeys = [ASSET_KEYS.ITEM_1, ASSET_KEYS.ITEM_2, ASSET_KEYS.ITEM_3];
    const itemKey = this.seededRandom.pick(itemKeys);

    const item = this.items.create(x, y, itemKey) as Phaser.Physics.Arcade.Sprite;
    item.setOrigin(0.5, 0.5);
    item.setDisplaySize(80, 80);

    this.lastItemSpawnDistance = this.worldDistance;

    this.tweens.add({
      targets: item,
      y: y - 15,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private endGame() {
    this.player.setVelocity(0, 0);
    this.player.anims.stop();

    const finalScore = Math.floor(this.distance * this.distanceRate) + this.itemCollected;
    const store = SaveStore.load();
    const isNewBest = finalScore > store.highScore;

    if (isNewBest) {
      SaveStore.save({ highScore: finalScore });
    }

    const targetX = this.player.x - 80;
    const catchUpDuration = 800;

    this.tweens.add({
      targets: this.rival,
      x: targetX,
      duration: catchUpDuration,
      ease: 'Power2',
      onComplete: () => {
        this.rival.setVelocity(0, 0);
        this.rival.anims.stop();
        this.time.delayedCall(500, () => {
          this.showGameOverUI(finalScore, isNewBest);
        });
      }
    });
  }

  private showGameOverUI(finalScore: number, isNewBest: boolean) {
    const { width, height } = this.scale;

    const blackBg = this.add.rectangle(0, 0, width, height, 0x000000, 0.75);
    blackBg.setOrigin(0.5, 0.5);
    blackBg.setScale(2);

    new UIText(this, width / 2, height * 0.4, 'GAME OVER', '64px', '#ffffff', '#000', 4, FONT_FAMILY, 0.5, 0.5);
    new UIText(this, width / 2, height * 0.5, `Score: ${finalScore}${isNewBest ? ' (NEW BEST!)' : ''}`, '36px', isNewBest ? '#ffff00' : '#ffffff', '#000', 3, FONT_FAMILY, 0.5, 0.5);
    new UIPrimaryButton(this, width / 2, height * 0.65, ASSET_KEYS.YELLOW_BUTTON, 'Continue', () => {
      document.dispatchEvent(new CustomEvent('game-over', { detail: { score: finalScore, selectedCharacter: this.selected } }));
      this.scene.stop();
    }, 240, 100);
  }
}
