import { GameValues, FindEnumByValue } from '../GameValues';
import { GameResources, FindResourceById } from '../GameResources';

export class MapHexData {
  constructor() {
    // Terrain::GUID.
    this.terrain = null;
    // (Optional) Location::GUID [default=NONE].
    this.location = null;
    // (Optional) EnemyType::GUID [default=NONE]. Enemy will be drawn from the list of enemies of this type. Either specify 'rampagingEnemyType' or 'rampagingEnemy' but not both.
    this.rampagingEnemyType = null;
    // (Optional) Enemy::GUID [default=NONE]. Enemy showing up on this hex. Either specify 'rampagingEnemyType' or 'rampagingEnemy' but not both.
    this.rampagingEnemy = null;
  }

  isValid() {
    if (!this.terrain) return false;
    if (!!this.location && !FindResourceById(GameResources.Location, this.location.id))
      return false;
    if (!!this.rampagingEnemyType && !!this.rampagingEnemy) return false;
    if (
      !!this.rampagingEnemyType &&
      !FindEnumByValue(GameValues.EnemyType, this.rampagingEnemyType.value)
    )
      return false;
    // TODO(ylaunay) support loading local mods GUIDs
    if (!!this.rampagingEnemy && !FindResourceById(GameResources.Enemy, this.rampagingEnemy.id))
      return false;

    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid MapHexData');

    const out = {};

    out.terrain = this.terrain.id;
    if (this.location) {
      out.location = this.location.value;
    }
    if (this.rampagingEnemy) {
      out.rampagingEnemy = this.rampagingEnemy.id;
    } else if (this.rampagingEnemyType) {
      out.rampagingEnemyType = this.rampagingEnemyType.value;
    }

    return out;
  }

  static FromJson(json) {
    const data = new MapHexData();

    data.terrain = FindResourceById(GameResources.Terrain, json.terrain);
    data.location = json.location ? FindResourceById(GameResources.Location, json.location) : null;
    // TODO(ylaunay) support loading local GUIDs
    data.rampagingEnemy = json.rampagingEnemy
      ? FindResourceById(GameResources.Enemy, json.rampagingEnemy)
      : null;
    data.rampagingEnemyType = json.rampagingEnemyType
      ? FindEnumByValue(GameValues.EnemyType, json.rampagingEnemyType)
      : null;

    return data.isValid() ? data : null;
  }
}
