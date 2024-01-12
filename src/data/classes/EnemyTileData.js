export class EnemyTileData {
  constructor(){
    // "string. local file path in mod enemy folder. PNG, 512x768, Outline (10px; 0,0,0), Using the map token base.
    this.tileNormalSprite = null; 
    // string. local file path in mod enemy folder. PNG, 512x768, Outline (5px; 0,255,33), outlined version of Normal.
		this.tileOutlinedSprite = null;
  }

  isValid(){
    return !!this.tileNormalSprite && !!this.tileOutlinedSprite;
  }

  // Throw if data is not valid
  toJson(){
    if( ! this.isValid() ) throw new Error('Invalid EnemyTileData');
    
    const out = {};

    out.tileNormalSprite = this.tileNormalSprite;
    out.tileOutlinedSprite = this.tileOutlinedSprite;

    return out;
  }

  // Returns null if json doesn't produce valid data.
  static FromJson(json){
    const data = new EnemyTileData();

    data.tileNormalSprite = json.tileNormalSprite;
    data.tileOutlinedSprite = json.tileOutlinedSprite;

    return data.isValid() ? data : null;
  }
}
