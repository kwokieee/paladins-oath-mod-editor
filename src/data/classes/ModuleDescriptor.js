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

  static async Load(modInfoStore, moduleId, modType, dataParserFn) {
    const modJson = await getTextContentOfFile(
      modInfoStore.getModuleDescriptorPath(moduleId),
      modInfoStore.zip,
    );
    const modData = dataParserFn(JSON.parse(modJson));
    // TODO(ylaunay) load additional images if any
    if (!modData) {
      // TODO(ylaunay) show error on UI
      console.log(`Failed to load mod '${moduleId}'`);
      return null;
    }
    console.log('Loaded ModData ', modData); // TODO(ylaunay) TEMP

    const descriptor = new ModuleDescriptor(modType);
    descriptor.guid = modData.guid;
    descriptor.data = modData;
    descriptor.folder = modInfoStore.getModuleFolder(modData.guid);

    return descriptor;
  }
}
