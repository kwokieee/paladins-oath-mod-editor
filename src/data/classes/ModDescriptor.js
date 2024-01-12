// Must be provided with the mod. 256x256 image.
const MOD_PREVIEW_IMAGE_NAME = 'mod_preview.jpg';

export class ModDescriptor {
  constructor(){
    //	string. Must be universally unique across all mods.
    this.guid = null;
    // string. Name displayed in the list of Mods
    this.name = null;
    // string. Description displayed in the list of Mods
    this.description = null;
     // string. Author(s) displayed in the list of Mods
    this.author = null;
    // string. Should be changed each time a new version of the mod is published. This will help with compatibility checks.
    this.version = null;
    // (Optional) List<string>. List of folder names that contain Rewards modding data. One folder per rewards data
    this.rewardsMods = [];
    // (Optional) List<string>. List of folder names that contain Oath modding data. One folder per oath
    this.oathMods = [];
    // (Optional) List<string>. List of folder names that contain Character modding data. One folder per character data
    this.characterMods = [];
    // (Optional) List<string>. List of folder names that contain enemy modding data. One folder per enemy.
    this.enemyMods = [];
    // (Optional) List<string>. List of folder names that contain Terrain modding data. One folder per terrain data
    this.terrainMods = [];
    // (Optional) List<string>. List of folder names that contain map section modding data. One folder per map section.
    this.mapSectionMods = [];
    // (Optional) List<string>. List of folder names that contain scenario modding data. One folder per scenario mod.
    this.scenarioMods = [];
    // (Optional) List<string>. List of folder names that contain scenario extensions modding data. One folder per scenario extension mod.
    this.scenarioExtensionMods = [];
  }

  isValid(){
    if( !this.guid ) return false;
    if( !this.name ) return false;
    if( !this.description ) return false;
    if( !this.author ) return false;
    if( !this.version ) return false;

    return true;
  }

  // Throw if data is not valid
  toJson(){
    if( ! this.isValid() ) throw new Error('Invalid ModDescriptor');
 
    const out = {};

    out.guid = this.guid;
    out.name = this.name;
    out.description = this.description;
    out.author = this.author;
    out.version = this.version;
    out.rewardsMods = this.rewardsMods.map(s=>s);
    out.oathMods = this.oathMods.map(s=>s);
    out.characterMods = this.characterMods.map(s=>s);
    out.enemyMods = this.enemyMods.map(s=>s);
    out.terrainMods = this.terrainMods.map(s=>s);
    out.mapSectionMods = this.mapSectionMods.map(s=>s);
    out.scenarioMods = this.scenarioMods.map(s=>s);
    out.scenarioExtensionMods = this.scenarioExtensionMods.map(s=>s);

    return out;
  }

  static FromJson(json){
    const data = new ModDescriptor();

    data.guid = json.guid;
    data.name = json.name;
    data.description = json.description;
    data.author = json.author;
    data.version = json.version;
    data.rewardsMods = !!json.rewardsMods ? json.rewardsMods.map(m=>m) : [];
    data.oathMods = !!json.oathMods ? json.oathMods.map(m=>m) : [];
    data.characterMods = !!json.characterMods ? json.characterMods.map(m=>m) : [];
    data.enemyMods = !!json.enemyMods ? json.enemyMods.map(m=>m) : [];
    data.terrainMods = !!json.terrainMods ? json.terrainMods.map(m=>m) : [];
    data.mapSectionMods = !!json.mapSectionMods ? json.mapSectionMods.map(m=>m) : [];
    data.scenarioMods = !!json.scenarioMods ? json.scenarioMods.map(m=>m) : [];
    data.scenarioExtensionMods = !!json.scenarioExtensionMods ? json.scenarioExtensionMods.map(m=>m) : [];

    return data.isValid() ? data : null;
  }
}
