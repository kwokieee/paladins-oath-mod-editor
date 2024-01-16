import {GameValues, FindEnumByValue} from '../GameValues';

export class RewardData {
  constructor(){
    // string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid
    this.guid = null;
    // string. Reward name (not localized) to be displayed when the rewards are distributed.
    this.name = null;
    // (Optional) int (AND=0 | OR=1) [default=AND(0)]. Determines how the reward options are given to the player.
    this.comboType = GameValues.RewardComboType.combo_and;
    // List<RewardData>. List of rewards to give to the player. Cannot be empty.
    this.rewardOptions = [];
  }

  isValid(){
    if( !this.guid ) return false;
    if( !this.name ) return false;
    if( !this.comboType || !FindEnumByValue(GameValues.RewardComboType, this.comboType.value) ) return false;
    if( this.rewardOptions.length <= 0) return false;
  
    for( let i = 0; i < this.rewardOptions.length; i++ ){
      const reward = this.rewardOptions[i];
      // TODO(ylaunay) support loading local mod GUIDs
      if( ! reward || ! FindEnumByValue(GameValues.Reward, reward.value) ){
        return false;
      }
    }

    return true;
  }

  // Throw if data is not valid
  toJson(){
    if( ! this.isValid() ) throw new Error('Invalid RewardData');
 
    const out = {};

    out.guid = this.guid;
    out.name = this.name;
    out.comboType = this.comboType.value;
    out.rewardOptions = this.rewardOptions.map(r => r.value);
    
    return out;
  }

  static FromJson(json){
    const data = new RewardData();

    data.guid = json.guid;
    data.name = json.name;
    data.comboType = FindEnumByValue(GameValues.RewardComboType, json.comboType);
    // TODO(ylaunay) support loading local mod GUIDs
    data.rewardOptions = json.rewardOptions.map(r => FindEnumByValue(GameValues.Reward, r));

    return data.isValid() ? data : null;
  }
}
