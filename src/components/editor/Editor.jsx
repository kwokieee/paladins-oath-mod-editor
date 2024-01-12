import { useEffect, useState } from 'react';
import RewardsEditor from './RewardsEditor';
import OathEditor from './OathEditor';
import CharacterEditor from './CharacterEditor';
import EnemyEditor from './EnemyEditor';
import TerrainEditor from './TerrainEditor';
import MapSectionEditor from './MapSectionEditor';
import ScenarioEditor from './ScenarioEditor';
import ScenarioExtensionEditor from './ScenarioExtensionEditor';
import { useModInfo } from '../../hooks/useModInfo';

export default function Editor() {
  const { selectedModuleType, selectedModule, getModuleDescriptor } = useModInfo();
  const [moduleDescriptor, setModuleDescriptor] = useState(null);
  const loadModuleDescriptor = async () => {
    const moduleDescriptor = await getModuleDescriptor();
    setModuleDescriptor(moduleDescriptor);
  };

  useEffect(() => {
    loadModuleDescriptor();
  }, [selectedModule]);

  if (selectedModuleType === '' || !moduleDescriptor) {
    return <>No module selected</>;
  } else if (selectedModuleType === 'rewardsMods') {
    return <RewardsEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'oathMods') {
    return <OathEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'characterMods') {
    return <CharacterEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'enemyMods') {
    return <EnemyEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'terrainMods') {
    return <TerrainEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'mapSectionMods') {
    return <MapSectionEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'scenarioMods') {
    return <ScenarioEditor moduleDescriptor={moduleDescriptor} />;
  } else if (selectedModuleType === 'scenarioExtensionMods') {
    return <ScenarioExtensionEditor moduleDescriptor={moduleDescriptor} />;
  }

  return <>Invalid module type detected</>;
}
