import ModuleGroup from './ModuleGroup';
import { useModuleStore } from '../../hooks/useModuleStore';
import { ModuleTypes } from '../../data/moduleTypes';

export const ModuleExplorer = () => {
  const moduleStore = useModuleStore();

  return (
    <div style={{ overflow: 'scroll', minWidth: '100%', maxWidth: '100%' }}>
      <ModuleGroup
        displayName={'Rewards'}
        type={ModuleTypes.rewards}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.rewards)}
      />
      <ModuleGroup
        displayName={'Oaths'}
        type={ModuleTypes.oath}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.oath)}
      />
      <ModuleGroup
        displayName={'Characters'}
        type={ModuleTypes.character}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.character)}
      />
      <ModuleGroup
        displayName={'Enemies'}
        type={ModuleTypes.enemy}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.enemy)}
      />
      <ModuleGroup
        displayName={'Terrain'}
        type={ModuleTypes.terrain}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.terrain)}
      />
      <ModuleGroup
        displayName={'Map Sections'}
        type={ModuleTypes.mapSection}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.mapSection)}
      />
      <ModuleGroup
        displayName={'Scenarios'}
        type={ModuleTypes.scenario}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.scenario)}
      />
      <ModuleGroup
        displayName={'Scenario Extensions'}
        type={ModuleTypes.scenarioExtension}
        moduleIds={moduleStore.getModuleGuidsFor(ModuleTypes.scenarioExtension)}
      />
    </div>
  );
};
