import { GameValues, FindEnumByValue } from '../../data/GameValues';

export class ManaData {
  constructor() {
    // ManaColor::GUID.
    this.color = GameValues.ManaColor.mana_red;
    // ManaForm::int. Form of the mana (crystal, token, ...)
    this.form = GameValues.ManaForm.Crystal;
  }

  isValid() {
    if (!this.color || !FindEnumByValue(GameValues.ManaColor, this.color.value)) return false;
    if (!this.form || !FindEnumByValue(GameValues.ManaForm, this.form.value)) return false;
    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid Mana Data');

    const out = {};

    out.color = this.color.value;
    out.form = this.form.value;

    return out;
  }

  // Returns null if json doesn't form valid data
  static fromJson(json) {
    const data = new ManaData();

    if (json.color) {
      data.color = FindEnumByValue(GameValues.ManaColor, json.color);
    }
    if (json.form) {
      data.form = FindEnumByValue(GameValues.ManaForm, json.form);
    }

    return data.isValid() ? data : null;
  }
}
