import { makeAutoObservable } from 'mobx';
import { unzip, getTextContentOfFile } from '../utils';
import { ModDescriptor } from '../data/classes/ModDescriptor';
import { ModuleStore } from './ModuleStore';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

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
    const modDescriptor = ModDescriptor.LoadDataFrom(JSON.parse(textContent));
    if (!modDescriptor) {
      console.error("Invalid mod.json file at mod's root directory");
      return null;
    }

    const trimmedZip = await this.retrieveRelevantFiles(zip, modDescriptor, pathRoot);
    console.log(trimmedZip);

    this.zip = trimmedZip;
    this.pathRoot = pathRoot;
    this.modDescriptor = modDescriptor;
    await this.moduleStore.loadModulesUsing(this);

    this.hasMod = true;
  }

  async retrieveRelevantFiles(zip, modDescriptor, pathRoot) {
    const trimmedZip = new JSZip();
    await zip
      .file(`${pathRoot}/mod_preview.jpg`)
      .async('blob')
      .then((content) => {
        trimmedZip.file(`${pathRoot}/mod_preview.jpg`, content);
      });
    await zip
      .file(`${pathRoot}/mod.json`)
      .async('blob')
      .then((content) => {
        trimmedZip.file(`${pathRoot}/mod.json`, content);
      });
    const foldersOfInterest = [];
    const filePatternsOfInterest = [];
    modDescriptor.rewardsMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
    });
    modDescriptor.oathMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
    });
    modDescriptor.characterMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.png`));
    });
    modDescriptor.enemyMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.png`));
    });
    modDescriptor.terrainMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.png`));
    });
    modDescriptor.mapSectionMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filesOfInterest.push(`${pathRoot}/${moduleId}/mod.json`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
    });
    modDescriptor.scenarioMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.png`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.lua`));
    });
    modDescriptor.scenarioExtensionMods.forEach((moduleId) => {
      foldersOfInterest.push(`${pathRoot}/${moduleId}`);
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/mod.json`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.png`));
      filePatternsOfInterest.push(new RegExp(`^${pathRoot}\/${moduleId}\/[^/]+\.lua`));
    });
    foldersOfInterest.forEach((folder) => {
      trimmedZip.folder(folder);
    });
    await Promise.all(
      zip
        .filter((relativePath, file) => {
          return filePatternsOfInterest.some((validPattern) => validPattern.test(relativePath));
        })
        .map(async (zipObject) => {
          const content = await zipObject.async('blob');
          trimmedZip.file(zipObject.name, content);
        }),
    );
    return trimmedZip;
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

  getModGuid() {
    return this.modDescriptor.guid;
  }

  export() {
    const modJson = this.modDescriptor.toJson();
    this.zip.file(`${this.pathRoot}/mod.json`, JSON.stringify(modJson, null, 2));
    this.moduleStore.export();
    this.zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'mod.zip');
    });
  }

  createModule() {}

  deleteModule() {}

  updateModule() {}
}
