import { useEffect } from 'react';
import {TerrainData} from '../../data/classes/TerrainData';

export default function TerrainEditor({ moduleDescriptor }) {
    useEffect(() => {
      console.log(moduleDescriptor);
    }, [moduleDescriptor]);
  
    if( ! moduleDescriptor ){
      return <>Loading...</>;
    }
  
    const terrainData = TerrainData.fromJson(moduleDescriptor);
    if( ! terrainData ){
      return <>Invalid or corrupted data</>;
    }
  
  return (
    <>
      <div>
        <div>
          <h5>guid</h5>
          <p>{terrainData.guid}</p>
          <h5>Name</h5>
          <p>{terrainData.name}</p>
          <h5>Tile Sprites</h5>
          <p>{terrainData.tileSprites.join('')}</p>
          <h5>Movement Cost</h5>
          <p>Day: {terrainData.movementCostDay.allowMovement?terrainData.movementCostDay.cost:'X'}</p>
          <p>Night: {terrainData.movementCostNight.allowMovement?terrainData.movementCostNight.cost:'X'}</p>
        </div>
      </div>
    </>
  );
}
