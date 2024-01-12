import { useEffect } from 'react';
import {EnemyData} from '../../data/classes/EnemyData';

export default function EnemyEditor({ moduleDescriptor }) {
  useEffect(() => {
    console.log(moduleDescriptor);
  }, [moduleDescriptor]);

  if( ! moduleDescriptor ){
    return <>Loading...</>;
  }

  const enemyData = EnemyData.fromJson(moduleDescriptor);
  if( ! enemyData ){
    return <>Invalid or corrupted data</>;
  }
  
  return (
    <>
      <div>
        <div>
          <h5>guid</h5>
          <p>{enemyData.guid}</p>
          <h5>Name</h5>
          <p>{enemyData.name}</p>
          <h5>Number of instances in deck</h5>
          <p>{enemyData.numInstancesInDeck}</p>
          <h5>Enemy type</h5>
          <p>{enemyData.enemyType.name}</p>
          <h5>Armor</h5>
          <p>{enemyData.armor}</p>
          <h5>Is Elusive</h5>
          <p>{enemyData.isElusive ? 'Elusive' : 'Not Elusive'}</p>
          <h5>Elusive data</h5>
          <h6>Armor if blocked</h6>
          <p>{enemyData.elusiveData?.armorIfBlocked}</p>
          <h5>Fortification</h5>
          <p>{enemyData.fortification.name}</p>
          <h5>XP gain</h5>
          <p>{enemyData.xpGain}</p>
          <h5>Reputation gain</h5>
          <p>{enemyData.reputationGain}</p>
          <h5>Reputation gain bonus when rampaging</h5>
          <p>{enemyData.reputationGainBonusWhenRampaging}</p>
          <h5>Challenge rating</h5>
          <p>{enemyData.challengeRating}</p>
          <h5>Attacks</h5>
          {enemyData.attacks.map((atk, index) => (
            <>{'['+atk.element.name+'] ('+atk.attackType.name+') '+atk.value+' '+atk.attackModifiers.map(mod => mod.name).join(',')}</>
          ))}
          <h5>Summoning attacks</h5>
          {enemyData.summoningAttacks.map((atk, index) => (
            <>{atk.name}</>
          ))}
          <h5>Immunities</h5>
          <p>
            {enemyData.immunities.map((immunity, index) => (
               <>{immunity.name}</>
            ))}
          </p>
          <h5>Resistances</h5>
          <p>
            {enemyData.resistances.map((resistance, index) => (
              <>{resistance.name}</>
            ))}
          </p>
          <h5>Portrait sprite</h5>
          <h5>Full body sprite</h5>
          <h5>Full body outline sprite</h5>
          <h5>Tile data</h5>
          <h5>Tile sprite</h5>
          <h5>Tile outlined sprite</h5>
        </div>
      </div>
    </>
  );
}
