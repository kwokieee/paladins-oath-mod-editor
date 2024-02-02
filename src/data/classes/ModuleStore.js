import { makeAutoObservable, observable, action } from 'mobx';
import { getTextContentOfFile } from '../../utils';
import { ModuleDescriptor } from './ModuleDescriptor';
import { RewardData } from './RewardData';
import { OathData } from './OathData';
import { CharacterData } from './CharacterData';
import { EnemyData } from './EnemyData';
import { TerrainData } from './TerrainData';
import { MapSectionData } from './MapSectionData';
// import { ScenarioData } from './data/classes/ScenarioData';
// import { ScenarioExtensionData } from './data/classes/ScenarioExtensionData';
import { ModuleTypes } from '../moduleTypes';

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
    this.modules = {};
    this.selectedModule = null;
    this.selectedModuleType = null;
    this.isSwitchingModule = false;
    this.selectedModuleType = null;
    this.selectedModule = null;
    makeAutoObservable(this);
  }

  static async loadModules(modInfoStore, modulesList, moduleType, modParserFn) {
    const loadedModules = {};
    for (const moduleId of modulesList) {
      console.log('Loading module: ' + moduleId);
      const module = await ModuleDescriptor.Load(modInfoStore, moduleId, moduleType, modParserFn);
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
    const modules = {};
    modules.rewardsMods = await ModuleStore.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.rewardsMods,
      ModuleTypes.rewards,
      (json) => {
        return RewardData.FromJson(json);
      },
    );
    modules.oathMods = await ModuleStore.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.oathMods,
      ModuleTypes.oath,
      (json) => {
        return OathData.FromJson(json);
      },
    );
    modules.characterMods = await ModuleStore.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.characterMods,
      ModuleTypes.character,
      (json) => {
        return CharacterData.FromJson(json);
      },
    );
    modules.enemyMods = await ModuleStore.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.enemyMods,
      ModuleTypes.enemy,
      (json, folder) => {
        return EnemyData.LoadDataFrom(json, folder);
      },
    );
    modules.terrainMods = await ModuleStore.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.terrainMods,
      ModuleTypes.terrain,
      (json) => {
        return TerrainData.FromJson(json);
      },
    );
    modules.mapSectionMods = await ModuleStore.loadModules(
      modInfoStore,
      modInfoStore.modDescriptor.mapSectionMods,
      ModuleTypes.mapSection,
      (json) => {
        return MapSectionData.FromJson(json);
      },
    );
    // modules.scenarioMods = loadModules(modInfoStore, modInfoStore.modDescriptor.scenarioMods, ModuleTypes.scenario, (json) => {
    //   return ScenarioData.FromJson(json);
    // });
    modules.scenarioMods = {};
    // modules.scenarioExtensionMods = loadModules(modInfoStore, modInfoStore.modDescriptor.scenarioExtensionMods, ModuleTypes.scenarioExtension, (json) => {
    //   return ScenarioExtensionData.FromJson(json);
    // });
    modules.scenarioExtensionMods = {};
    this.modules = modules;
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

  changeSelectedModuleTo(moduleType, moduleId) {
    this.isSwitchingModule = true;
    this.selectedModuleType = moduleType;
    this.selectedModule = moduleId;
    console.log(this.selectedModuleType);
    console.log(this.selectedModule);
    this.isSwitchingModule = false;
  }

  hasNoModuleSelected() {
    return !this.selectedModule || !this.selectedModuleType;
  }
}
