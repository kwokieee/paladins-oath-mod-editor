import { makeAutoObservable } from 'mobx';
import { GameValues, FindEnumByValue } from '../../data/GameValues';
import { GameResources, FindResourceById } from '../GameResources';

export class CrusadeStartingBoonsData {
  constructor() {
    // (Optional) List<Card::GUID> [default=EMPTY]. List of cards the character will start with.
    this.cards = [];
    // (Optional) List<Follower::GUID> [default=EMPTY]. List of units the character will start with.
    this.followers = [];
    // (Optional) List<Blessing::GUID> [default=EMPTY]. List of skills the character will start with.
    this.blessings = [];
    // (Optional) List<ManaColor::GUID> [default=EMPTY]. List of mana crystals the character will start with.
    this.crystalsInInventory = [];
    // (Optional) int [default=0]. Can be negative. Increase/Reduce character armor.
    this.armorBonus = 0;
    // (Optional) int [default=0]. Can be negative. Increase/Reduce character hand size.
    this.handSizeBonus = 0;
    // (Optional) int [default=0]. Can be negative. Increase/Reduce character reputation.
    this.reputationBonus = 0;
    // (Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too).
    this.followerSlotsBonus = 0;
    makeAutoObservable(this);
  }

  isValid() {
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      if (!card || !FindResourceById(GameResources.Card, card.id)) {
        return false;
      }
    }
    for (let i = 0; i < this.followers.length; i++) {
      const follower = this.followers[i];
      if (!follower || !FindResourceById(GameResources.Follower, follower.id)) {
        return false;
      }
    }
    for (let i = 0; i < this.blessings.length; i++) {
      const blessing = this.blessings[i];
      if (!blessing || !FindResourceById(GameResources.Blessing, blessing.id)) {
        return false;
      }
    }
    for (let i = 0; i < this.crystalsInInventory.length; i++) {
      const crystal = this.crystalsInInventory[i];
      if (!crystal || !FindEnumByValue(GameValues.ManaColor, crystal.value)) {
        return false;
      }
    }
    if (this.followerSlotsBonus < 0) return false;
    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid Crusade Starting Boons Data');

    const out = {};

    out.cards = this.cards.map((card) => card.value);
    out.followers = this.followers.map((follower) => follower.value);
    out.blessings = this.blessings.map((blessing) => blessing.value);
    out.crystalsInInventory = this.crystalsInInventory.map((crystal) => crystal.value);
    out.armor = this.armor;
    out.handSizeBonus = this.handSizeBonus;
    out.reputationBonus = this.reputationBonus;
    out.followerSlotsBonus = this.followerSlotsBonus;

    return out;
  }

  // Returns null if json doesn't form valid data
  static FromJson(json) {
    const data = new CrusadeStartingBoonsData();

    if (json.cards) {
      json.cards.forEach((jsonVal) => {
        const card = FindResourceById(GameResources.Card, jsonVal);
        if (card !== null) {
          data.cards.push(card);
        }
      });
    }
    if (json.followers) {
      json.followers.forEach((jsonVal) => {
        const follower = FindResourceById(GameResources.Follower, jsonVal);
        if (follower !== null) {
          data.followers.push(follower);
        }
      });
    }
    if (json.blessings) {
      json.blessings.forEach((jsonVal) => {
        const blessing = FindResourceById(GameResources.Blessing, jsonVal);
        if (blessing !== null) {
          data.blessings.push(blessing);
        }
      });
    }
    if (json.crystalsInInventory) {
      json.crystalsInInventory.forEach((jsonVal) => {
        const crystal = FindEnumByValue(GameValues.ManaColor, jsonVal);
        if (crystal !== null) {
          data.crystalsInInventory.push(crystal);
        }
      });
    }
    data.armorBonus = json.armorBonus;
    data.handSizeBonus = json.handSizeBonus;
    data.reputationBonus = json.reputationBonus;
    data.followerSlotsBonus = json.followerSlotsBonus;

    return data.isValid() ? data : null;
  }
}
