import { useEffect } from 'react';
import {MapSectionData} from '../../data/classes/MapSectionData';

export default function MapSectionEditor({ moduleDescriptor }) {
    useEffect(() => {
      console.log(moduleDescriptor);
    }, [moduleDescriptor]);
  
    if( ! moduleDescriptor ){
      return <>Loading...</>;
    }
  
    const sectionData = MapSectionData.FromJson(moduleDescriptor);
    if( ! sectionData ){
      return <>Invalid or corrupted data</>;
    }
  
  return (
    <>
      <div>
        <div>
          <h5>guid</h5>
          <p>{sectionData.guid}</p>
          <h5>Num Instances In Deck</h5>
          <p>{sectionData.numInstancesInDeck}</p>
          <h5>Section Type</h5>
          <p>{sectionData.sectionType.name}</p>
          <h5>Hexes</h5>
          {sectionData.hexes.map((hex, idx) => (
            <>
              <p>====</p>
              <p>Terrain: {hex.terrain.id}</p>
              <p>Location: {hex.location?.id ?? ''}</p>
              <p>Enemy: {hex.rampagingEnemy?.id ?? ''}</p>
              <p>EnemyType: {hex.rampagingEnemyType?.value ?? ''}</p>
            </>
          ))}
        </div>
      </div>
    </>
  );
}