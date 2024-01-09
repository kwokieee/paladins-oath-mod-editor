import ModuleGroup from "./ModuleGroup";

export default function ModuleExplorer({ modDescriptor }) {
  return (
    <div style={{ overflow: 'scroll', minWidth: '100%', maxWidth: '100%' }}>
      <ModuleGroup displayName={"Rewards"} type={"rewardsMods"} modNames={modDescriptor.rewardsMods} />
      <ModuleGroup displayName={"Oaths"} type={"oathMods"} modNames={modDescriptor.oathMods} />
      <ModuleGroup displayName={"Characters"} type={"characterMods"} modNames={modDescriptor.characterMods} />
      <ModuleGroup displayName={"Enemies"} type={"enemyMods"} modNames={modDescriptor.enemyMods} />
      <ModuleGroup displayName={"Terrain"} type={"terrainMods"} modNames={modDescriptor.terrainMods} />
      <ModuleGroup displayName={"Map Sections"} type={"mapSectionMods"} modNames={modDescriptor.mapSectionMods} />
      <ModuleGroup displayName={"Scenarios"} type={"scenarioMods"} modNames={modDescriptor.scenarioMods} />
      <ModuleGroup displayName={"Scenario Extensions"} type={"scenarioExtensionMods"} modNames={modDescriptor.scenarioExtensionMods} />
    </div>
  );
}
