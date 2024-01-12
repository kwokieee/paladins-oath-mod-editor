import {GameValues, FindEnumByValue} from '../../data/GameValues';

export class EnemyAttackData {
  constructor(){
    // Element. Resource ID. for the attack element
    this.element = GameValues.Element.element_physical;
    // (Optional) AttackType::int [default=Basic(0)]. Int value for AttackType enum.
    this.attackType = GameValues.AttackType.Basic;
    // int > 0. Value of the attack.
    this.value = 1;
    // (Optional) List<AttackModifier::int> [default=EMPTY]. List of modifier enum values (Poison, Cumbersome, ...)
    this.attackModifiers = [];
  }

  isValid(){
    if( ! this.element || ! FindEnumByValue(GameValues.Element, this.element.value) ) return false;
    if( ! this.attackType || ! FindEnumByValue(GameValues.AttackType, this.attackType.value) ) return false;
    if( this.value <= 0 ) return false;
    if( this.attackModifiers.length > 0 ){
      for( let i = 0; i < this.attackModifiers.length; i++ ){
        const modifier = this.attackModifiers[i];
        if( ! modifier || ! FindEnumByValue(GameValues.AttackModifier, modifier.value) ){
          return false;
        }
      }
    }
    return true;
  }

  // Throw if data is not valid
  toJson(){
    if( ! this.isValid() ) throw new Error('Invalid Enemy Attack');
    
    const out = {};

    out.element = this.element.value;
    out.attackType = this.attackType.value;
    out.value = this.value;
    out.attackModifiers = this.attackModifiers.map(atkMod => atkMod.value);
    
    return out;
  }

  // Returns null if json doesn't form valid data
  static fromJson(json){
    const data = new EnemyAttackData();

    data.element = FindEnumByValue(GameValues.Element, json.element);
    data.attackType = FindEnumByValue(GameValues.AttackType, json.attackType);
    data.value = json.value;
    if( json.attackModifiers ){
      json.attackModifiers.forEach(jsonVal => {
        const atkMod = FindEnumByValue(GameValues.AttackModifier, jsonVal);
        if( atkMod !== null ){
          data.attackModifiers.push(atkMod);
        }
      });
    }

    return data.isValid() ? data : null;
  }
}