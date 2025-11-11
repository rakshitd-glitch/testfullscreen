export type ReplayActionType = 'jump' | 'slide_on' | 'slide_off';

export interface ReplayAction {
  d: number;
  type: ReplayActionType;
}

export interface ReplayData {
  actions: ReplayAction[];
}

export class ReplayRecorder {
  private actions: ReplayAction[] = [];
  private isRecording: boolean = false;

  startRecording() {
    this.isRecording = true;
    this.actions = [];
  }

  recordAction(worldDistance: number, type: ReplayActionType) {
    if (!this.isRecording) return;
    this.actions.push({ d: worldDistance, type });
  }

  getReplayData(): ReplayData {
    return { actions: [...this.actions] };
  }
}
