import { useEffect } from 'react';

export default function EnemyEditor({ moduleDescriptor }) {
  useEffect(() => {
    console.log(moduleDescriptor);
  }, [moduleDescriptor]);

  return (
    <>
      <div>
        <div>
          <h5>GUID</h5>
          <p>{moduleDescriptor?.guid}</p>
          <h5>Name</h5>
          <p>{moduleDescriptor?.name}</p>
          <h5>Number of instances in deck</h5>
          <p>{moduleDescriptor?.numInstancesInDeck}</p>
          <h5>Enemy type</h5>
          <p>{moduleDescriptor?.enemyType}</p>
          <h5>Armor</h5>
          <p>{moduleDescriptor?.armor}</p>
          <h5>Is Elusive</h5>
          <p>{moduleDescriptor?.isElusive.toString()}</p>
          <h5>Elusive data</h5>
          <h6>Armor if blocked</h6>
          <p>{moduleDescriptor?.elusiveData.armorIfBlocked}</p>
          <h5>Fortification</h5>
          <p>{moduleDescriptor?.fortification}</p>
          <h5>XP gain</h5>
          <p>{moduleDescriptor?.xpGain}</p>
          <h5>Reputation gain</h5>
          <p>{moduleDescriptor?.reputationGain}</p>
          <h5>Reputation gain bonus when rampaging</h5>
          <p>{moduleDescriptor?.reputationGainBonusWhenRampaging}</p>
          <h5>Challenge rating</h5>
          <p>{moduleDescriptor?.challengeRating}</p>
          <h5>Attacks</h5>
          {moduleDescriptor?.attacks.map((attack, index) => (
            <></>
          ))}
          <h5>Summoning attacks</h5>
          {moduleDescriptor?.summoningAttacks.map((summoningAttack, index) => (
            <></>
          ))}
          <h5>Immunities</h5>
          <p>
            {moduleDescriptor?.immunities.map((immunity, index) => (
              <></>
            ))}
          </p>
          <h5>Resistances</h5>
          <p>
            {moduleDescriptor?.resistances.map((resistance, index) => (
              <></>
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
