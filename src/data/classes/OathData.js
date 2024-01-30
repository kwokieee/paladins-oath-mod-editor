import { makeAutoObservable } from 'mobx';
import { CrusadeStartingBoonsData } from './CrusadeStartingBoonsData';
import { CrusadeRoundBoonsData } from './CrusadeRoundBoonsData';

export class OathData {
  constructor() {
    // string. guid, unique only within the mod. Will be turned into guid 'mod:'+$yourModId+':'+$guid
    this.guid = null;
    // string. name displayed to the players
    this.name = null;
    // string. Flavor text describing the oath (stick to 2-3 lines max).
    this.description = null;
    // (Optional) CrusadeStartingBoons. What the player starts with.
    this.startingBoons = null;
    // (Optional) CrusadeRoundBoons. What the player gets every round.
    this.roundBoons = null;
    // (Optional) bool [default=false]. Set to true if the oath can only be used by a specific character (that character data should include it).
    this.isCharacterSpecific = false;
    makeAutoObservable(this);
  }

  isValid() {
    if (!this.guid) return false;
    if (!this.name) return false;
    if (!this.description) return false;
    if (this.startingBoons && !this.startingBoons.isValid()) return false;
    if (this.roundBoons && !this.roundBoons.isValid()) return false;

    return true;
  }

  toJson() {
    if (!this.isValid()) throw new Error('Invalid Oath Data');

    const out = {};

    out.guid = this.guid;
    out.name = this.name;
    out.description = this.description;
    if (this.startingBoons) {
      out.startingBoons = this.startingBoons.toJson();
    }
    if (this.roundBoons) {
      out.roundBoons = this.roundBoons.toJson();
    }
    out.isCharacterSpecific = this.isCharacterSpecific;

    return out;
  }

  static FromJson(json) {
    const data = new OathData();

    data.guid = json.guid;
    data.name = json.name;
    data.description = json.description;
    data.startingBoons = json.startingBoons
      ? CrusadeStartingBoonsData.FromJson(json.startingBoons)
      : null;
    data.roundBoons = json.roundBoons ? CrusadeRoundBoonsData.FromJson(json.roundBoons) : null;
    data.isCharacterSpecific = json.isCharacterSpecific;

    return data.isValid() ? data : null;
  }
}
