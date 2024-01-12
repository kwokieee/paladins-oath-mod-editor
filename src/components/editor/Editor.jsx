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
  const { selectedModuleType, selectedModuleDescriptor, isSwitchingModule } = useModInfo();

  if (isSwitchingModule) {
    return <>Loading...</>;
  } else if (selectedModuleType === '' || !selectedModuleDescriptor) {
    return <>No module selected</>;
  } else if (selectedModuleType === 'rewardsMods') {
    return <RewardsEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'oathMods') {
    return <OathEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'characterMods') {
    return <CharacterEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'enemyMods') {
    return <EnemyEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'terrainMods') {
    return <TerrainEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'mapSectionMods') {
    return <MapSectionEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'scenarioMods') {
    return <ScenarioEditor moduleDescriptor={selectedModuleDescriptor} />;
  } else if (selectedModuleType === 'scenarioExtensionMods') {
    return <ScenarioExtensionEditor moduleDescriptor={selectedModuleDescriptor} />;
  }

  return <>Invalid module type detected</>;
}
