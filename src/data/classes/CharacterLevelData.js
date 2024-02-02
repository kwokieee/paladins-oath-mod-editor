import { makeAutoObservable } from 'mobx';
import { GameValues, FindEnumByValue } from '../../data/GameValues';

export class CharacterLevelData {
  constructor() {
    // int >= 0. At which XP this level up will be given.
    this.requiredXp = 0;
    // (Optional) Rewards::GUID [default=EMPTY]. ID of the rewards information to be given when leveling up. Don't specify if you don't want to give a reward at that level.
    this.rewardsLevelUp = null;
    makeAutoObservable(this);
  }

  isValid() {
    if (this.requiredXp < 0) return false;
    // TODO: support checking against local mod GUIDs
    // if (this.rewardsLeveUp && !FindEnumByValue(GameValues.Rewards, this.rewardsLevelUp.value))
    //   return false;
    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid Character Level');

    const out = {};

    out.requiredXp = this.requiredXp;
    out.rewardsLevelUp = this.rewardsLevelUp.value;

    return out;
  }

  // Returns null if json doesn't form valid data
  static LoadDataFrom(json) {
    const data = new CharacterLevelData();

    data.requiredXp = json.requiredXp;
    if (json.rewardsLevelUp) {
      // TODO: support checking against local mod GUIDs
      // data.rewardsLevelUp = FindEnumByValue(GameValues.Rewards, json.rewardsLevelUp);
    }

    return data.isValid() ? data : null;
  }
}
