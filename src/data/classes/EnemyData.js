import { EnemyElusiveData } from './EnemyElusiveData';
import { EnemyAttackData } from './EnemyAttackData';
import { GameResources, FindResourceById } from '../GameResources';
import { GameValues, FindEnumByValue } from '../GameValues';

export class EnemyData {
  constructor() {
    // string. guid, unique only within the mod. Will be turned into guid 'mod:'+$yourModId+':'+$guid
    this.guid = null;
    // string. Enemy name (not localized)
    this.name = null;
    // int >= 0 [default=1]. If > 0, the enemy will be added to draw piles.
    this.numInstancesInDeck = 1;
    // GameResources.EnemyType
    this.enemyType = null;
    // int > 0 [default=1].
    this.armor = 1;
    // (Optional) bool [default=false]. If true, MUST specify elusive data.
    this.isElusive = false;
    // (Optional) ElusiveData. only specify if 'isElusive' is true.
    this.elusiveData = null;
    // (Optional) Fortification::int [default=NotFortified(2)]. Enum value
    this.fortification = GameValues.Fortification.NotFortified;
    // int >= 0. How much XP gained when defeating the enemy in battle.
    this.xpGain = 0;
    // (Optional) int >= 0 [default=0]. How much reputation gained when defeating the enemy in battle.
    this.reputationGain = 0;
    // (Optional) int >= 0 [default=1]. How much additional reputation gained when defeating the enemy in battle when it is rampaging.
    this.reputationGainBonusWhenRampaging = 1;
    // (Optional) int [1-10] [default=1]. How difficult is the enemy. Used for balancing when drawing randomly and for generating Battle Tale. Check the Wiki for example ratings.
    this.challengeRating = 1;
    // 	List<AttackData>. Can be empty if 'summoningAttacks' as at least one value.
    this.attacks = [];
    // List<EnemyType>. Type of enemy summoned by this attack. Can be empty if 'attacks' as at least one value.
    this.summoningAttacks = [];
    // List<Immunity>. List of immunity enum values.
    this.immunities = [];
    // List<Element>. List of element Ids the enemy is resistant to.
    this.resistances = [];
    // TODO(ylaunay) add pictures and tileData files
  }

  isValid() {
    if (!this.guid) return false;
    if (!this.name) return false;
    if (this.numInstancesInDeck <= 0) return false;
    if (!this.enemyType) return false;
    if (this.armor <= 0) return false;
    if (this.isElusive && (!this.elusiveData || !this.elusiveData.isValid())) return false;
    if (!this.fortification) return false;
    if (this.xpGain < 0) return false;
    if (this.reputationGain < 0) return false;
    if (this.reputationGainBonusWhenRampaging < 0) return false;
    if (this.challengeRating < 1 || this.challengeRating > 10) return false;
    if (this.attacks.length > 0) {
      for (let i = 0; i < this.attacks.length; i++) {
        const atk = this.attacks[i];
        if (!atk || !atk.isValid()) {
          return false;
        }
      }
    }
    if (this.summoningAttacks.length > 0) {
      for (let i = 0; i < this.summoningAttacks.length; i++) {
        const summonType = this.summoningAttacks[i];
        if (!summonType || !FindResourceById(GameResources.EnemyType, summonType.value)) {
          return false;
        }
      }
    }
    if (this.attacks.length === 0 && this.summoningAttacks.length === 0) return false;
    if (this.immunities.length > 0) {
      for (let i = 0; i < this.immunities.length; i++) {
        const immunity = this.immunities[i];
        if (!immunity || !FindEnumByValue(GameValues.Immunity, immunity.value)) {
          return false;
        }
      }
    }
    if (this.resistances.length > 0) {
      for (let i = 0; i < this.resistances.length; i++) {
        const resistance = this.resistances[i];
        if (!resistance || !FindEnumByValue(GameValues.Element, resistance.value)) {
          return false;
        }
      }
    }
    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid EnemyData');

    const out = {};

    out.guid = this.guid;
    out.name = this.name;
    out.numInstancesInDeck = this.numInstancesInDeck;
    out.enemyType = this.enemyType.value;
    out.armor = this.armor;
    out.isElusive = this.isElusive;
    if (this.isElusive) {
      out.elusiveData = this.elusiveData.toJson();
    }
    out.fortification = this.fortification.value;
    out.xpGain = this.xpGain;
    out.reputationGain = this.reputationGain;
    out.reputationGainBonusWhenRampaging = this.reputationGainBonusWhenRampaging;
    out.challengeRating = this.challengeRating;
    out.summoningAttacks = this.summoningAttacks.map((atk) => atk.value);
    out.immunities = this.immunities.map((immunity) => immunity.value);
    out.resistances = this.resistances.map((res) => res.value);

    return out;
  }

  static fromJson(json) {
    const data = new EnemyData();

    data.guid = json.guid;
    data.name = json.name;
    data.numInstancesInDeck = json.numInstancesInDeck;
    data.enemyType = FindResourceById(GameResources.EnemyType, json.enemyType);
    data.armor = json.armor;
    data.isElusive = !!json.isElusive && !!json.elusiveData;
    if (data.isElusive) {
      data.elusiveData = EnemyElusiveData.fromJson(json.elusiveData);
    }
    data.fortification = FindEnumByValue(GameValues.Fortification, json.fortification);
    data.xpGain = json.xpGain;
    data.reputationGain = json.reputationGain;
    data.reputationGainBonusWhenRampaging = json.reputationGainBonusWhenRampaging;
    data.challengeRating = json.challengeRating;
    data.attacks = json.attacks ? json.attacks.map((atk) => EnemyAttackData.fromJson(atk)) : [];
    data.summoningAttacks = json.summoningAttacks
      ? json.summoningAttacks.map((atk) => FindResourceById(GameResources.EnemyType, atk))
      : [];
    data.immunities = json.immunities
      ? json.immunities.map((immunity) => FindEnumByValue(GameValues.Immunity, immunity))
      : [];
    data.resistances = json.resistances
      ? json.resistances.map((res) => FindEnumByValue(GameValues.Element, res))
      : [];

    return data.isValid() ? data : null;
  }
}