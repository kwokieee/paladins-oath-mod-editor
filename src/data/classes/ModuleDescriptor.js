import { makeAutoObservable } from 'mobx';
import { getTextContentOfFile } from '../../utils';

export class ModuleDescriptor {
  constructor(moduleType) {
    // Module GUID (local to the mod)
    this.guid = null;
    // string (rewardsMods, oathMods, ...)
    this.type = moduleType;
    // class. depending on module type (ex: RewardData, CharacterData, ...)
    this.data = null;
    // JSZip folder to manipulate files in the mod folder.
    this.folder = null;
    makeAutoObservable(this);
  }

  static async Load(modInfoStore, moduleStore, moduleId, modType, dataParserFn) {
    const modJson = await getTextContentOfFile(
      modInfoStore.getModuleDescriptorPath(moduleId),
      modInfoStore.zip,
    ).then((text) => JSON.parse(text));
    const modFolder = modInfoStore.getModuleFolder(moduleId);
    if (!modJson) {
      console.error(`Invalid json file for '${moduleId}'`);
      return null;
    }
    if (!modFolder) {
      console.error(`Invalid folder for '${moduleId}'`);
      return null;
    }

    const modData = await dataParserFn(modJson, modFolder, moduleStore);
    if (!modData) {
      console.error(`Failed to load mod '${moduleId}'`);
      return null;
    }
    console.log('Loaded ModData ', modData);
    const descriptor = new ModuleDescriptor(modType);
    descriptor.guid = modData.guid;
    descriptor.data = modData;
    descriptor.folder = modFolder;

    return descriptor;
  }

  export() {
    this.folder.file('mod.json', JSON.stringify(this.data.toJson(), null, 2));
    this.data
      .getImageData()
      .forEach((imageData) => this.folder.file(imageData.fileName, imageData.rawData));
  }
}
