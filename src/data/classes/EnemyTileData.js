import { makeAutoObservable } from 'mobx';
import { ModImageData } from './ModImageData';

export class EnemyTileData {
  constructor() {
    // "string. local file path in mod enemy folder. PNG, 512x768, Outline (10px; 0,0,0), Using the map token base.
    this.tileNormalSprite = null;
    // string. local file path in mod enemy folder. PNG, 512x768, Outline (5px; 0,255,33), outlined version of Normal.
    this.tileOutlinedSprite = null;
    makeAutoObservable(this);
  }

  isValid() {
    if (!this.tileNormalSprite || !this.tileNormalSprite.isValid()) return false;
    if (!this.tileOutlinedSprite || !this.tileOutlinedSprite.isValid()) return false;
    return true;
  }

  // Throw if data is not valid
  toJson() {
    if (!this.isValid()) throw new Error('Invalid EnemyTileData');

    const out = {};

    // out.tileNormalSprite = this.tileNormalSprite;
    // out.tileOutlinedSprite = this.tileOutlinedSprite;
    out.tileNormalSprite = this.tileNormalSprite.fileName;
    out.tileOutlinedSprite = this.tileOutlinedSprite.fileName;

    return out;
  }

  static async LoadDataFrom(json, folder) {
    const data = new EnemyTileData();

    await Promise.all([
      ModImageData.Load(json.tileNormalSprite, folder),
      ModImageData.Load(json.tileOutlinedSprite, folder),
    ]).then((images) => {
      data.tileNormalSprite = images[0];
      data.tileOutlinedSprite = images[1];
    });

    return data.isValid() ? data : null;
  }
}
