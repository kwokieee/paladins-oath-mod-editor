import { RewardsEditor } from './RewardsEditor';
import { OathEditor } from './OathEditor';
import { CharacterEditor } from './CharacterEditor';
import { EnemyEditor } from './EnemyEditor';
import { TerrainEditor } from './TerrainEditor';
import { MapSectionEditor } from './MapSectionEditor';
import { ScenarioEditor } from './ScenarioEditor';
import { ScenarioExtensionEditor } from './ScenarioExtensionEditor';
import { useModuleStore } from '../../hooks/useModuleStore';
import { ModuleTypes } from '../../data/ModuleTypes';
import { observer } from 'mobx-react-lite';

export const Editor = observer(() => {
  const moduleStore = useModuleStore();

  if (moduleStore.isSwitchingModule) {
    return <p style={{ textAlign: 'center', verticalAlign: 'middle' }}>Loading...</p>;
  }

  if (moduleStore.hasNoModuleSelected()) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ textAlign: 'center', verticalAlign: 'middle' }}>No module selected</p>
      </div>
    );
  }
  const selectedModuleDescriptor = moduleStore.getModuleDescriptorFor(moduleStore.selectedModule);

  switch (moduleStore.selectedModuleType) {
    case ModuleTypes.rewards:
      return <RewardsEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.oath:
      return <OathEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.character:
      return <CharacterEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.enemy:
      return <EnemyEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.terrain:
      return <TerrainEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.mapSection:
      return <MapSectionEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.scenario:
      return <ScenarioEditor moduleDescriptor={selectedModuleDescriptor} />;
    case ModuleTypes.scenarioExtension:
      return <ScenarioExtensionEditor moduleDescriptor={selectedModuleDescriptor} />;
    default:
      return <>Invalid module type detected</>;
  }
});
