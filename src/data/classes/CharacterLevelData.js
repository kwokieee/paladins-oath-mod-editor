import { makeAutoObservable } from 'mobx';
import { GameValues, FindEnumByValue } from '../../data/GameValues';
import { ModuleTypes } from '../ModuleTypes';

export class CharacterLevelData {
  constructor() {
    this.moduleStore = null;
    // int >= 0. At which XP this level up will be given.
    this.requiredXp = 0;
    // (Optional) Rewards::GUID [default=EMPTY]. ID of the rewards information to be given when leveling up. Don't specify if you don't want to give a reward at that level.
    this.rewardsLevelUp = null;
    makeAutoObservable(this);
  }

  isValid() {
    if (this.requiredXp < 0) return false;
    if (this.rewardsLeveUp && !FindEnumByValue(GameValues.Rewards, this.rewardsLevelUp.value) 
      && !FindEnumByValue(this.moduleStore.getRewardsValuesDict(), this.rewardsLevelUp.value))
      return false;
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
  static LoadDataFrom(json, moduleStore) {
    const data = new CharacterLevelData();

    data.moduleStore = moduleStore;
    data.requiredXp = json.requiredXp;
    if (json.rewardsLevelUp) {
      data.rewardsLevelUp = FindEnumByValue(GameValues.Reward, json.rewardsLevelUp) ||
        FindEnumByValue(moduleStore.getRewardsValuesDict(), moduleStore.extractModuleFrom(json.rewardsLevelUp, ModuleTypes.rewards));
    }

    return data.isValid() ? data : null;
  }
}
