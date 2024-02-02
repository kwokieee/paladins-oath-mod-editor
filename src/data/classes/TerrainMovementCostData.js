import { makeAutoObservable } from 'mobx';
import { GameValues, FindEnumByValue } from '../GameValues';

export class TerrainMovementCostData {
  constructor() {
    // TimeOfDay::GUID. Time of day the following data applies to.
    this.timeOfDay = GameValues.TimeOfDay.timeofday_day;
    // (Optional) bool [default=true]. Set to false to permanently disable movement onto this terrain type (ex: mountain)
    this.allowMovement = true;
    // int >= 0. Cost to enter this terrain. Ignored when 'allowMovement' is false.
    this.cost = 0;
    makeAutoObservable(this);
  }

  isValid() {
    if (!this.timeOfDay) return false;
    if (this.allowMovement && this.cost < 0) return false;

    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid TerrainMovementCostData');

    const out = {};

    out.timeOfDay = this.timeOfDay.value;
    out.allowMovement = this.allowMovement;
    if (out.allowMovement) {
      out.cost = this.cost;
    }

    return out;
  }

  // Returns null if json doesn't produce valid data.
  static FromJson(json) {
    const data = new TerrainMovementCostData();

    data.timeOfDay = FindEnumByValue(GameValues.TimeOfDay, json.timeOfDay);
    data.allowMovement = !!json.allowMovement;
    data.cost = data.allowMovement ? json.cost : 0;

    return data.isValid() ? data : null;
  }
}
