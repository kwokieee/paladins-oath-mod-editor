export class EnemyElusiveData {
  constructor() {
    // int > 0.
    this.armorIfBlocked = 1;
  }

  isValid() {
    return this.armorIfBlocked > 0;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid EnemyElusiveData');

    const out = {};

    out.armorIfBlocked = this.armorIfBlocked;

    return out;
  }

  // Returns null if json doesn't produce valid data.
  static FromJson(json) {
    const data = new EnemyElusiveData();

    data.armorIfBlocked = json.armorIfBlocked;

    return data.isValid() ? data : null;
  }
}
