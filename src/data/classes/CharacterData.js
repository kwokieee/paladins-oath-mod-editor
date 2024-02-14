import { makeAutoObservable } from 'mobx';
import { GameResources, FindResourceById } from '../GameResources';
import { GameValues, FindEnumByValue } from '../GameValues';
import { CharacterLevelData } from './CharacterLevelData';
import { CrusadeStartingBoonsData } from './CrusadeStartingBoonsData';
import { CrusadeRoundBoonsData } from './CrusadeRoundBoonsData';
import { ModuleTypes } from '../ModuleTypes';

export class CharacterData {
  constructor() {
    this.moduleStore = null;
    // string. guid, unique only within the mod. Will be turned into guid 'mod:'+$yourModId+':'+$guid
    this.guid = null;
    // string. Enemy name (not localized)
    this.name = null;
    // string. Backstory of the paladin.
    this.description = null;
    // string. flavor text describing what is good/bad at.
    this.playstyleInfo = null;
    // string. name of local file (local to the mod character folder). PNG, 256x256.
    this.portraitSprite = null;
    // string. name of local file (local to the mod character folder). PNG, 192x192.
    this.medallionSprite = null;
    // (Optional) ElusiveData. only specify if 'isElusive' is true.string. name of local file (local to the mod character  folder). PNG, 512x768, Outline (10,243;0,0,0).
    this.figurineSprite = null;
    // string. name of local file (local to the mod character  folder). PNG, 1024x1024, Outline (10,243;0,0,0).
    this.fullbodySprite = null;
    // string. name of local file (local to the mod character  folder). PNG, 256x384, Outline (10,243;0,0,0).
    this.tileDefaultSprite = null;
    // string. name of local file (local to the mod character  folder). PNG, 256x384, Outline (10,243;0,0,0).
    this.tileOccupiedSprite = null;
    // string. name of local file (local to the mod character  folder). PNG, 256x256, Outline (10,243;0,0,0).
    this.ownershipTokenMapPropSprite = null;
    // List<CharacterLevel>. Describes XP requirements and rewards for each level.
    this.levels = [];
    // List<Blessing::GUID>. List of blessings the character is born with. Will be added to the list of available blessings.
    this.inaneBlessings = [];
    // List<Card::GUID>. List of cards the character is born with, will be added to the deck.
    this.inaneCards = [];
    // (Optional) List<Card::GUID> [default=EMPTY]. Display purpose only, shows which cards are unique to this character (compared to other characters). Those cards should appear in the list of inaneCards too.
    this.uniqueCardsInfo = [];
    // (Optional) List<Oath::GUID> [default=EMPTY]. List of Oaths that are unique to this character (Oaths that are marked as 'character specific').
    this.personalOaths = []; // TODO: support loading local mod GUIDs
    // (Optional) int > 0 [default=1]. How many Ambient mana can the character use.
    this.defaultAllowedAmbientDie = 1;
    // (Optional) int > 0 [default=1]. How many Healing points are required to heal 1 wound on this character.
    this.numPointsRequiredPerWound = 1;
    // (Optional) int > 0 [default=1]. How many hexes away from exploration spot can the character explore.
    this.defaultExplorationDistance = 1;
    // (Optional) int >= 0 [default=2]. How many movement points does it cost to explore (by default).
    this.defaultExplorationMovementCost = 2;
    // int > 0. How much armor does the character start with.
    this.starterArmor = 2;
    // int > 0. How many cards can the character hold in hand by default.
    this.starterHandSize = 5;
    // int >= 0. How many followers can the character manage from the start.
    this.starterFollowerSlotCount = 1;
    // int [-7,+7]. Starting character reputation (0=neutral).
    this.starterReputation = 0;
    // CrusadeStartingBoons. Boons the dummy player starts with (typically should be N=3 crystals)
    this.dummyPlayerStartingBoons = null;
    // (Optional) CrusadeStartingBoons [default=EMPTY]. Additional boons the character starts with (ex: crystals, followers, blessings ...)
    this.startingBoons = null;
    // (Optional) CrusadeRoundBoons [default=EMPTY]. Boons the character receives every round  (ex: crystals, followers, blessings, reputation, movement)
    this.roundBoons = null;
    makeAutoObservable(this);
  }

  isValid() {
    if (!this.guid) return false;
    if (!this.name) return false;
    if (!this.description) return false;
    if (!this.playstyleInfo) return false;
    // TODO: image files
    if (this.levels.length <= 0) return false;
    for (let i = 0; i < this.levels.length; i++) {
      const level = this.levels[i];
      if (!level || !level.isValid()) {
        return false;
      }
    }
    for (let i = 0; i < this.inaneBlessings.length; i++) {
      const blessing = this.inaneBlessings[i];
      if (!blessing || !FindResourceById(GameResources.Blessing, blessing.id)) {
        return false;
      }
    }
    for (let i = 0; i < this.inaneCards.length; i++) {
      const card = this.inaneCards[i];
      if (!card || !FindResourceById(GameResources.Card, card.id)) {
        return false;
      }
    }
    for (let i = 0; i < this.uniqueCardsInfo.length; i++) {
      const card = this.uniqueCardsInfo[i];
      if (!card || !FindResourceById(GameResources.Card, card.id)) {
        return false;
      }
    }
    for (let i = 0; i < this.personalOaths.length; i++) {
      const oath = this.personalOaths[i];
      if (!oath || (!FindEnumByValue(GameValues.Oath, oath.value) && !FindEnumByValue(this.moduleStore.getOathValuesDict(), oath.value))) {
        return false;
      }
    }
    if (this.defaultAllowedAmbientDie <= 0) return false;
    if (this.numPointsRequiredPerWound <= 0) return false;
    if (this.defaultExplorationDistance <= 0) return false;
    if (this.defaultExplorationMovementCost < 0) return false;
    if (this.starterArmor <= 0) return false;
    if (this.starterHandSize <= 0) return false;
    if (this.starterFollowerSlotCount < 0) return false;
    if (this.starterReputation < -7 || this.starterReputation > 7) return false;
    if (!this.dummyPlayerStartingBoons || !this.dummyPlayerStartingBoons.isValid()) return false;
    if (this.startingBoons && !this.startingBoons.isValid()) return false;
    if (this.roundBoons && !this.roundBoons.isValid()) return false;

    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid CharacterData');

    const out = {};

    out.guid = this.guid;
    out.name = this.name;
    out.description = this.description;
    out.playstyleInfo = this.playstyleInfo;
    out.portraitSprite = this.portraitSprite;
    out.medallionSprite = this.medallionSprite;
    out.figurineSprite = this.figurineSprite;
    out.fullbodySprite = this.fullbodySprite;
    out.tileDefaultSprite = this.tileDefaultSprite;
    out.tileOccupiedSprite = this.tileOccupiedSprite;
    out.ownershipTokenMapPropSprite = this.ownershipTokenMapPropSprite;
    out.levels = this.levels.map((level) => level.toJson());
    out.inaneBlessings = this.inaneBlessings.map((blessing) => blessing.id);
    out.inaneCards = this.inaneCards.map((card) => card.id);
    out.uniqueInaneCardsInfo = this.uniqueCardsInfo.map((card) => card.id);
    out.personalOaths = this.personalOaths.map((oath) => oath.id);
    out.defaultAllowedAmbientDie = this.defaultAllowedAmbientDie;
    out.numPointsRequiredPerWound = this.numPointsRequiredPerWound;
    out.defaultExplorationDistance = this.defaultExplorationDistance;
    out.defaultExplorationMovementCost = this.defaultExplorationMovementCost;
    out.starterArmor = this.starterArmor;
    out.starterHandSize = this.starterHandSize;
    out.starterFollowerSlotCount = this.starterFollowerSlotCount;
    out.starterReputation = this.starterReputation;
    out.dummyPlayerStartingBoons = this.dummyPlayerStartingBoons.toJson();
    if (this.startingBoons) {
      out.startingBoons = this.startingBoons.toJson();
    }
    if (this.roundBoons) {
      out.roundBoons = this.roundBoons.toJson();
    }

    return out;
  }

  static LoadDataFrom(json, folder, moduleStore) {
    const data = new CharacterData();

    data.moduleStore = moduleStore;
    data.guid = json.guid;
    data.name = json.name;
    data.description = json.description;
    data.playstyleInfo = json.playstyleInfo;
    data.portraitSprite = json.portraitSprite;
    data.medallionSprite = json.medallionSprite;
    data.figurineSprite = json.figurineSprite;
    data.fullbodySprite = json.fullbodySprite;
    data.tileDefaultSprite = json.tileDefaultSprite;
    data.tileOccupiedSprite = json.tileOccupiedSprite;
    data.ownershipTokenMapPropSprite = json.ownershipTokenMapPropSprite;
    data.levels = json.levels.map((level) => CharacterLevelData.LoadDataFrom(level, moduleStore));
    data.inaneBlessings = json.inaneBlessings.map((blessing) =>
      FindResourceById(GameResources.Blessing, blessing),
    );
    data.inaneCards = json.inaneCards.map((card) => FindResourceById(GameResources.Card, card));
    data.uniqueCardsInfo = json.uniqueInaneCardsInfo
      ? json.uniqueInaneCardsInfo.map((card) => FindResourceById(GameResources.Card, card))
      : [];
    data.personalOaths = [];
    // Return value of the user loaded oath has to be a GameValue { value: 'id', name: 'name' }
    data.personalOaths = json.personalOaths
      ? json.personalOaths.map((oath) => {
          return FindEnumByValue(GameValues.Oath, oath) || 
            FindEnumByValue(moduleStore.getOathValuesDict(), moduleStore.extractModuleFrom(oath, ModuleTypes.oath));
        })
      : [];
    data.defaultAllowedAmbientDie = json.defaultAllowedAmbientDie;
    data.numPointsRequiredPerWound = json.numPointsRequiredPerWound;
    data.defaultExplorationDistance = json.defaultExplorationDistance;
    data.defaultExplorationMovementCost = json.defaultExplorationMovementCost;
    data.starterArmor = json.starterArmor;
    data.starterHandSize = json.starterHandSize;
    data.starterFollowerSlotCount = json.starterFollowerSlotCount;
    data.starterReputation = json.starterReputation;
    data.dummyPlayerStartingBoons = CrusadeStartingBoonsData.LoadDataFrom(
      json.dummyPlayerStartingBoons,
    );
    data.startingBoons = json.startingBoons
      ? CrusadeStartingBoonsData.LoadDataFrom(json.startingBoons)
      : null;
    data.roundBoons = json.roundBoons ? CrusadeRoundBoonsData.LoadDataFrom(json.roundBoons) : null;

    return data.isValid() ? data : null;
  }
}
