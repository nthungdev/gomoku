interface PlayerConfig {
  value: number
}

export default class Player {
  public value: number;

  constructor(config: PlayerConfig) {
    this.value = config.value;
  }
}