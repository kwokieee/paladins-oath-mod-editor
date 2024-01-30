import { makeAutoObservable } from 'mobx';
import { GameValues } from '../GameValues';
import { TerrainMovementCostData } from './TerrainMovementCostData';

export class TerrainData {
  constructor() {
    // string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid
    this.guid = null;
    // string. Name for the terrain, will be shown to the user (non localized)
    this.name = null;
    // List<string>. List of file names, local to the mod folder. One file per tile variation. Need at least one.
    this.tileSprites = [];
    // TerrainMovementCostData
    this.movementCostDay = null;
    // TerrainMovementCostData
    this.movementCostNight = null;
    makeAutoObservable(this);
  }

  isValid() {
    if (!this.guid) return false;
    if (!this.name) return false;
    if (this.tileSprites.length <= 0) return false;
    if (!this.movementCostDay || !this.movementCostDay.isValid()) return false;
    if (!this.movementCostNight || !this.movementCostNight.isValid()) return false;

    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid TerrainData');

    const out = {};

    out.guid = this.guid;
    out.name = this.name;
    out.tileSprites = this.tileSprites.map((s) => s);
    out.movementCost = [this.movementCostDay.toJson(), this.movementCostNight.toJson()];

    return out;
  }

  static FromJson(json) {
    const data = new TerrainData();

    data.guid = json.guid;
    data.name = json.name;
    data.tileSprites = json.tileSprites;

    const movementCostList = json.movementCost.map((c) => TerrainMovementCostData.FromJson(c));
    data.movementCostDay = movementCostList.find(
      (c) => c.timeOfDay?.value === GameValues.TimeOfDay.timeofday_day.value,
    );
    data.movementCostNight = movementCostList.find(
      (c) => c.timeOfDay?.value === GameValues.TimeOfDay.timeofday_night.value,
    );

    return data.isValid() ? data : null;
  }
}
