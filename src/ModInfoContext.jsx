import { createContext, useState } from 'react';
import { unzip, getTextContentOfFile, createObjectURL } from './utils';
import { ModDescriptor } from './data/classes/ModDescriptor';
import { RewardData } from './data/classes/RewardData';
import { EnemyData } from './data/classes/EnemyData';
import { TerrainData } from './data/classes/TerrainData';
import { MapSectionData } from './data/classes/MapSectionData';

export const ModInfoContext = createContext(null);
class ModInfo {
  constructor(zip, pathRoot, descriptor) {
    this.zip = zip;
    this.pathRoot = pathRoot;
    this.descriptor = descriptor;
    this.modules = {};
  }

  static async Load(zipFileName) {
    const zip = await unzip(zipFileName);

    // Find the first mod.json file in the zip file
    // Use that folder as root of the zip.
    // Some users might upload additional file structure.

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
      return null;
    }

    return new ModInfo(zip, pathRoot, modDescriptor);
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

class ModuleDescriptor {
  constructor(moduleType) {
    // Module GUID (local to the mod)
    this.guid = null;
    // string (RewardData, OathData, ...)
    this.type = moduleType;
    // class. depending on module type (ex: RewardData, CharacterData, ...)
    this.data = null;
    // JSZip folder to manipulate files in the mod folder.
    this.folder = null;
  }

  static async Load(modInfo, modId, modType, dataParserFn) {
    const modJson = await getTextContentOfFile(modInfo.getModuleDescriptorPath(modId), modInfo.zip);

    const modData = dataParserFn(JSON.parse(modJson));
    // TODO(ylaunay) load additional images if any
    if (!modData) {
      // TODO(ylaunay) show error on UI
      console.log(`Failed to load mod '${modId}'`);
      return null;
    }
    console.log('Loaded ModData ', modData); // TODO(ylaunay) TEMP

    const descriptor = new ModuleDescriptor(modType);
    descriptor.guid = modData.guid;
    descriptor.data = modData;
    descriptor.folder = modInfo.getModuleFolder(modData.guid);

    return descriptor;
  }
}

async function loadModules(modInfo, modulesList, moduleType, modParserFn) {
  const loadedModules = {};
  for (const modId of modulesList) {
    console.log('Loading module: ' + modId);
    const module = await ModuleDescriptor.Load(modInfo, modId, moduleType, modParserFn);
    if (!module) {
      // TODO(ylaunay) show error on UI
      console.log(`Failed to load mod '${modId}'`);
      continue;
    }
    if (module.guid !== modId) {
      // TODO(ylaunay) show error on UI
      console.log(
        `Mod '${modId}' folder name should be the same as the module id '${module.guid}'`,
      );
      continue;
    }
    loadedModules[module.guid] = module;
  }
  return loadedModules;
}

export function ModInfoProvider({ children }) {
  const [pathRoot, setPathRoot] = useState('');
  const [moduleFiles, setModuleFiles] = useState(null);
  const [modDescriptor, setModDescriptor] = useState(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedModuleType, setSelectedModuleType] = useState('');

  const [selectedModuleDescriptor, setSelectedModuleDescriptor] = useState(null);
  const [isSwitchingModule, setIsSwitchingModule] = useState(false);

  const loadModFromZipFile = async (zipFile) => {
    const modInfo = await ModInfo.Load(zipFile);
    console.log('ModInfo', modInfo); // TODO(ylaunay) TEMP
    if (modInfo == null) {
      console.error("No mod.json found in mod's root directory");
      setModDescriptor(null);
    } else {
      // Load all modules
      const modules = {};
      modules.rewardsMods = loadModules(
        modInfo,
        modInfo.descriptor.rewardsMods,
        RewardData.constructor.name,
        (json) => {
          return RewardData.FromJson(json);
        },
      );
      // modules.oathMods = loadModules(modInfo, modInfo.descriptor.oathMods, OathData.constructor.name, (json) => {
      //   return OathData.FromJson(json);
      // });
      // modules.characterMods = loadModules(modInfo, modInfo.descriptor.characterMods, CharacterData.constructor.name, (json) => {
      //   return CharacterData.FromJson(json);
      // });
      modules.enemyMods = loadModules(
        modInfo,
        modInfo.descriptor.enemyMods,
        EnemyData.constructor.name,
        (json) => {
          return EnemyData.FromJson(json);
        },
      );
      modules.terrainMods = loadModules(
        modInfo,
        modInfo.descriptor.terrainMods,
        TerrainData.constructor.name,
        (json) => {
          return TerrainData.FromJson(json);
        },
      );
      modules.mapSectionMods = loadModules(
        modInfo,
        modInfo.descriptor.mapSectionMods,
        MapSectionData.constructor.name,
        (json) => {
          return MapSectionData.FromJson(json);
        },
      );
      // modules.scenarioMods = loadModules(modInfo, modInfo.descriptor.scenarioMods, ScenarioData.constructor.name, (json) => {
      //   return ScenarioData.FromJson(json);
      // });
      // modules.scenarioExtensionMods = loadModules(modInfo, modInfo.descriptor.scenarioExtensionMods, ScenarioExtensionData.constructor.name, (json) => {
      //   return ScenarioExtensionData.FromJson(json);
      // });

      // TODO(ylaunay) clean-up to use modInfo instead
      setPathRoot(modInfo.pathRoot);
      setModuleFiles(modInfo.zip);
      setModDescriptor(modInfo.descriptor);
      setSelectedModule('');
      setSelectedModuleType('');
    }
  };

  const getModuleDescriptor = async (name) => {
    if (!name) {
      return null;
    }
    const textContent = await getTextContentOfFile(`${pathRoot}/${name}/mod.json`, moduleFiles);
    const moduleDescriptor = JSON.parse(textContent);
    return moduleDescriptor;
  };

  const getUrlForFile = async (filePath) => {
    return await createObjectURL(filePath, moduleFiles);
  };

  const switchSelectedModuleTo = async (name, type) => {
    setIsSwitchingModule(true);
    const moduleDescriptor = await getModuleDescriptor(name);
    setSelectedModuleDescriptor(moduleDescriptor);
    setSelectedModule(name);
    setSelectedModuleType(type);
    setIsSwitchingModule(false);
  };

  const value = {
    loadModFromZipFile,
    getUrlForFile,
    switchSelectedModuleTo,
    modDescriptor,
    pathRoot,
    isSwitchingModule,
    selectedModule,
    setSelectedModule,
    selectedModuleType,
    setSelectedModuleType,
    selectedModuleDescriptor,
  };

  return <ModInfoContext.Provider value={value}>{children}</ModInfoContext.Provider>;
}
