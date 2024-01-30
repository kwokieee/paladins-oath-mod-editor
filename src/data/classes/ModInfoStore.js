import { makeAutoObservable, observable, action, makeObservable } from 'mobx';
import { unzip, getTextContentOfFile } from '../../utils';
import { ModDescriptor } from './ModDescriptor';
import { ModuleStore } from './ModuleStore';

export class ModInfoStore {
  constructor() {
    this.hasMod = false;
    this.zip = null;
    this.pathRoot = null;
    this.modDescriptor = null;
    this.moduleStore = new ModuleStore();
    makeAutoObservable(this);
  }

  async loadModFrom(zipFile) {
    this.hasMod = false;
    const zip = await unzip(zipFile);
    let modJsonFilePath;
    const hasModJsonAtRoot = Object.keys(zip.files).some((path) => {
      const isValidModJson =
        path.endsWith('/mod.json') &&
        path.includes('/') &&
        path.lastIndexOf('/') == path.indexOf('/');
      if (isValidModJson) {
        modJsonFilePath = path;
      }
      return isValidModJson;
    });

    if (!hasModJsonAtRoot) {
      return null;
    }

    const pathRoot = modJsonFilePath.substring(0, modJsonFilePath.indexOf('/'));
    const textContent = await getTextContentOfFile(modJsonFilePath, zip);
    const modDescriptor = ModDescriptor.FromJson(JSON.parse(textContent));
    if (!modDescriptor) {
      console.error("Invalid mod.json file at mod's root directory");
      return null;
    }

    this.zip = zip;
    this.pathRoot = pathRoot;
    this.modDescriptor = modDescriptor;
    await this.moduleStore.loadModulesUsing(this);

    this.hasMod = true;
  }

  getModuleFolder(modId) {
    return this.zip.folder(`${this.pathRoot}/${modId}`);
  }

  getModuleFilePath(modId, fileName) {
    return `${this.pathRoot}/${modId}/${fileName}`;
  }

  getModuleDescriptorPath(modId) {
    return this.getModuleFilePath(modId, 'mod.json');
  }
}
