interface PlayerConfig {
  value: number
  name?: string
}

export default class Player {
  public value: number;
  public name: string;

  constructor(config: PlayerConfig) {
    this.value = config.value;
    this.name = config.name || `Player ${config.value}`;
  }

  toString(): string {
    return this.name;
  }
}