export class Start {
  static readonly type = '[Game] Start'
}

export class Tick {
  static readonly type = '[Game] Tick Tock'
}

export class ChangeSpeed {
  static readonly type = '[Game] Change Speed'

  constructor(readonly payload: number) {}
}

export class Pause {
  static readonly type = '[Game] Paused'
}
