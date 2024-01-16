import { ManaData } from './ManaData';

export class CrusadeRoundBoonsData {
  constructor() {
    // (Optional) List<Mana> [default=EMPTY]. List of mana that the character will receive every round.
    this.mana = [];
    // (Optional) int [default=0]. Can be negative. Increase/Reduce character reputation every round.
    this.reputationBonus = 0;
    // (Optional) int >= 0 [default=0]. Gain movement points every round.
    this.movementPoints = 0;
    // (Optional) int >= 0 [default=0]. Gain healing points every round.
    this.healingPoints = 0;
    // (Optional) int >= 0 [default=0]. Gain leadership points every round.
    this.leadershipPoints = 0;
  }

  isValid() {
    for (let i = 0; i < this.mana.length; i++) {
      const mana = this.mana[i];
      if (!mana || !mana.isValid()) {
        return false;
      }
    }
    if (this.movementPoints < 0) return false;
    if (this.healingPoints < 0) return false;
    if (this.leadershipPoints < 0) return false;
    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid Crusade Round Boons Data');

    const out = {};

    out.mana = this.mana.map((mana) => mana.toJson());
    out.reputationBonus = this.reputationBonus;
    out.movementPoints = this.movementPoints;
    out.healingPoints = this.healingPoints;
    out.leadershipPoints = this.leadershipPoints;

    return out;
  }

  // Returns null if json doesn't form valid data
  static fromJson(json) {
    const data = new CrusadeRoundBoonsData();

    data.mana = json.mana ? json.mana.map((mana) => ManaData.fromJson(mana)) : [];
    data.reputationBonus = json.reputationBonus;
    data.movementPoints = json.movementPoints;
    data.healingPoints = json.healingPoints;
    data.leadershipPoints = json.leadershipPoints;

    return data.isValid() ? data : null;
  }
}
