import { makeAutoObservable, observable, action } from 'mobx';
import { getTextContentOfFile } from '../utils';
import { ModuleDescriptor } from '../data/classes/ModuleDescriptor';
import { RewardData } from '../data/classes/RewardData';
import { OathData } from '../data/classes/OathData';
import { CharacterData } from '../data/classes/CharacterData';
import { EnemyData } from '../data/classes/EnemyData';
import { TerrainData } from '../data/classes/TerrainData';
import { MapSectionData } from '../data/classes/MapSectionData';
// import { ScenarioData } from './data/classes/ScenarioData';
// import { ScenarioExtensionData } from './data/classes/ScenarioExtensionData';
import { ModuleTypes } from '../data/ModuleTypes';

export class ModuleStore {
  /**
   * modules = {
   *    rewardsMods: {
   *      new ModuleDescriptor(),
   *      new ModuleDescriptor(),
   *    },
   *    oathMods: {
   *      new ModuleDescriptor(),
   *    },
   *    ...
   * }
   */

  constructor() {
    this.modInfoStore = null;
    this.modules = {};
    this.selectedModule = null;
    this.selectedModuleType = null;
    this.isSwitchingModule = false;
    this.selectedModuleType = null;
    this.selectedModule = null;
    makeAutoObservable(this);
  }

  async loadModules(modInfoStore, modulesList, moduleType, modParserFn) {
    const loadedModules = {};
    for (const moduleId of modulesList) {
      console.log('Loading module: ' + moduleId);
      const module = await ModuleDescriptor.Load(
        modInfoStore,
        this,
        moduleId,
        moduleType,
        modParserFn,
      );
      if (!module) {
        // TODO(ylaunay) show error on UI
        console.log(`Failed to load mod '${moduleId}'`);
        continue;
      }
      if (module.guid !== moduleId) {
        // TODO(ylaunay) show error on UI
        console.log(
          `Mod '${moduleId}' folder name should be the same as the module id '${module.guid}'`,
        );
        continue;
      }
      loadedModules[module.guid] = module;
    }
    return loadedModules;
  }

  async loadModulesUsing(modInfoStore) {
    this.modInfoStore = modInfoStore;
    this.modules = {};
    this.modules.rewardsMods = await this.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.rewardsMods,
      ModuleTypes.rewards,
      (json, folder, moduleStore) => {
        return RewardData.LoadDataFrom(json, folder, moduleStore);
      },
    );
    this.modules.oathMods = await this.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.oathMods,
      ModuleTypes.oath,
      (json, folder, moduleStore) => {
        return OathData.LoadDataFrom(json, folder, moduleStore);
      },
    );
    this.modules.characterMods = await this.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.characterMods,
      ModuleTypes.character,
      (json, folder, moduleStore) => {
        return CharacterData.LoadDataFrom(json, folder, moduleStore);
      },
    );
    this.modules.enemyMods = await this.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.enemyMods,
      ModuleTypes.enemy,
      (json, folder, moduleStore) => {
        return EnemyData.LoadDataFrom(json, folder, modInfoStore, moduleStore);
      },
    );
    this.modules.terrainMods = await this.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.terrainMods,
      ModuleTypes.terrain,
      (json, folder, moduleStore) => {
        return TerrainData.LoadDataFrom(json, folder, moduleStore);
      },
    );
    this.modules.mapSectionMods = await this.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.mapSectionMods,
      ModuleTypes.mapSection,
      (json, folder, moduleStore) => {
        return MapSectionData.LoadDataFrom(json, folder, moduleStore);
      },
    );
    // this.modules.scenarioMods = loadModules(modInfoStore, modInfoStore.modDescriptor.scenarioMods, ModuleTypes.scenario, (json) => {
    //   return ScenarioData.LoadDataFrom(json);
    // });
    this.modules.scenarioMods = {};
    // this.modules.scenarioExtensionMods = loadModules(modInfoStore, modInfoStore.modDescriptor.scenarioExtensionMods, ModuleTypes.scenarioExtension, (json) => {
    //   return ScenarioExtensionData.LoadDataFrom(json);
    // });
    this.modules.scenarioExtensionMods = {};
    this.selectedModuleType = null;
    this.selectedModule = null;
  }

  export() {
    this.getAllDescriptors().forEach((moduleDescriptor) => {
      moduleDescriptor.export();
    });
  }

  getCurrentlyLoadedModuleGuids() {
    return Object.keys(this.modules);
  }

  getModuleGuidsFor(moduleType) {
    return Object.keys(this.modules[moduleType]);
  }

  getAllDescriptors() {
    return Object.values(this.modules).flatMap((modulesOfCertainType) =>
      Object.values(modulesOfCertainType),
    );
  }

  getModuleDescriptorFor(moduleGuid) {
    return this.getAllDescriptors().find(
      (moduleDescriptor) => moduleDescriptor.guid === moduleGuid,
    );
  }

  containsModule(moduleType, moduleGuid) {
    return this.modules[moduleType][moduleGuid] !== undefined;
  }

  getOathValuesDict() {
    const oathValuesDict = {};
    for (const moduleGuid of this.getModuleGuidsFor(ModuleTypes.oath)) {
      const moduleDescriptor = this.getModuleDescriptorFor(moduleGuid);
      oathValuesDict[moduleGuid] = {
        value: moduleGuid,
        name: moduleDescriptor.data.name,
      };
    }
    return oathValuesDict;
  }

  getRewardsValuesDict() {
    const rewardsValuesDict = {};
    for (const moduleGuid of this.getModuleGuidsFor(ModuleTypes.rewards)) {
      const moduleDescriptor = this.getModuleDescriptorFor(moduleGuid);
      rewardsValuesDict[moduleGuid] = {
        value: moduleGuid,
        name: moduleDescriptor.data.name,
      };
    }
    return rewardsValuesDict;
  }

  // TODO
  getTerrainResourcesDict() {
    const terrainResourcesDict = {};
    for (const moduleGuid of this.getModuleGuidsFor(ModuleTypes.terrain)) {
      const moduleDescriptor = this.getModuleDescriptorFor(moduleGuid);
      terrainResourcesDict[moduleGuid] = {
        id: moduleGuid,
        name: moduleDescriptor.data.name,
        image: moduleDescriptor.data.imageData.fileName,
        properties: {},
      };
    }
    return terrainResourcesDict;
  }

  isValidModuleGuid(guid, moduleType) {
    const guidParts = guid.split(':');
    if (guidParts.length !== 3) return false;
    if (guidParts[0] !== 'mod') return false;
    if (guidParts[1] !== this.modInfoStore.getModGuid()) return false;
    if (Object.keys(this.modules[moduleType]).includes(guidParts[2])) return false;
    return true;
  }

  extractModuleFrom(guid, moduleType) {
    if (this.isValidModuleGuid(guid, moduleType)) return null;
    return guid.split(':')[2];
  }

  changeSelectedModuleTo(moduleType, moduleId) {
    this.isSwitchingModule = true;
    this.selectedModuleType = moduleType;
    this.selectedModule = moduleId;
    this.isSwitchingModule = false;
  }

  hasNoModuleSelected() {
    return !this.selectedModule || !this.selectedModuleType;
  }
}
