import {GameValues, FindEnumByValue} from '../GameValues';
import {MapHexData} from './MapHexData';

const NUM_MAP_SECTION_HEXES = 7;

export class MapSectionData {
  constructor(){
    // string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid
    this.guid = null;
    // (Optional) int >=0 [default=1]. How many times this tile can appear in the draw deck. Set 0 to disable drawing this tile.
    this.numInstancesInDeck = 1;
    // (Optional) MapSectionType::int [default=REGULAR(1)].
    this.sectionType = GameValues.MapSectionType.Regular;
    // 7 hexes for the map
    this.hexes = [];
  }

  isValid(){
    if( !this.guid ) return false;
    if( this.numInstancesInDeck < 0 ) return false;
    if( !FindEnumByValue(GameValues.MapSectionType, this.sectionType.value) ) return false;
    if( this.hexes.length !== NUM_MAP_SECTION_HEXES ) return false;
   
    for( let i = 0; i < this.hexes.length; i++ ){
      const hex = this.hexes[i];
      if( ! hex || ! hex.isValid() ){
        return false;
      }
    }

    return true;
  }

  // Throw if data is not valid
  toJson(){
    if( ! this.isValid() ) throw new Error('Invalid MapSectionData');
 
    const out = {};

    out.guid = this.guid;
    out.numInstancesInDeck = this.numInstancesInDeck;
    out.sectionType = this.sectionType.value;
    out.hexes = this.hexes.map(hex => hex.toJson());  
    
    return out;
  }

  static FromJson(json){
    const data = new MapSectionData();

    data.guid = json.guid;
    data.numInstancesInDeck = json.numInstancesInDeck;
    data.sectionType = FindEnumByValue(GameValues.MapSectionType, json.sectionType);
    data.hexes = json.hexes.map(hex => MapHexData.FromJson(hex));

    return data.isValid() ? data : null;
  }
}
