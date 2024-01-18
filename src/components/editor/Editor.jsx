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
    return <p style={{ textAlign: 'center', verticalAlign: 'middle' }}>Loading...</p>;
  } else if (selectedModuleType === '' || !selectedModuleDescriptor) {
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
