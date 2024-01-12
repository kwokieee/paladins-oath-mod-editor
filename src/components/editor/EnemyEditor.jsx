import { useEffect, useState } from 'react';
import ResourcePicker from '../resourcePicker/ResourcePicker';
import { GameResources } from '../../data/GameResources';
import { useModInfo } from '../../hooks/useModInfo';

export default function EnemyEditor({ moduleDescriptor }) {
  const { pathRoot, selectedModule, getUrlForFile } = useModInfo();
  const [isEditingEnemyType, setIsEditingEnemyType] = useState(false);
  const [portraitSprite, setPortraitSprite] = useState("");
  const [fullBodySprite, setFullBodySprite] = useState("");
  const [fullBodyOutlineSprite, setFullBodyOutlineSprite] = useState("");
  const [tileNormalSprite, setTileNormalSprite] = useState("");
  const [tileOutlinedSprite, setTileOutlinedSprite] = useState("");

  const loadImages = async () => {
    const portraitSprite = await getUrlForFile(`${pathRoot}/${selectedModule}/${moduleDescriptor?.portraitSprite}`);
    setPortraitSprite(portraitSprite);
    const fullBodySprite = await getUrlForFile(`${pathRoot}/${selectedModule}/${moduleDescriptor?.fullBodySprite}`);
    setFullBodySprite(fullBodySprite);
    const fullBodyOutlineSprite = await getUrlForFile(`${pathRoot}/${selectedModule}/${moduleDescriptor?.fullBodyOutlineSprite}`);
    setFullBodyOutlineSprite(fullBodyOutlineSprite);
    const tileNormalSprite = await getUrlForFile(`${pathRoot}/${selectedModule}/${moduleDescriptor?.tileData?.tileNormalSprite}`);
    setTileNormalSprite(tileNormalSprite);
    const tileOutlinedSprite = await getUrlForFile(`${pathRoot}/${selectedModule}/${moduleDescriptor?.tileData?.tileOutlinedSprite}`);
    setTileOutlinedSprite(tileOutlinedSprite);
  }

  useEffect(() => {
    console.log(moduleDescriptor);
    loadImages();
  }, [moduleDescriptor]);
  const onEditEnemyType = () => {
    setIsEditingEnemyType(!isEditingEnemyType);
  };

  return (
    <div>
      <h5>GUID</h5>
      <input
        type='text'
        placeholder={'string. guid, unique only within the mod. Will be turned into GUID \'mod:\'+$yourModId+\':\'+$guid\''}
        defaultValue={moduleDescriptor?.guid} 
      />

      <hr />

      <h5>Name</h5>
      <input
        type='text'
        placeholder={'string. Enemy name (not localized)'}
        defaultValue={moduleDescriptor?.name}
      />

      <hr />

      <h5>Number of instances in deck</h5>
      <input
        type="number"
        placeholder="int >= 0 [default=1]. If > 0, the enemy will be added to draw piles."
        defaultValue={moduleDescriptor?.numInstancesInDeck}
      />

      <hr />

      <h5>Enemy type: {GameResources['EnemyType'][moduleDescriptor?.enemyType]['name']}</h5>
      <button style={{ marginBottom: 10 }} onClick={onEditEnemyType}>Edit</button>
      {isEditingEnemyType && <ResourcePicker resourceType={'EnemyType'} />}

      <hr />

      <h5>Armor</h5>
      {/* Number input */}
      <input
        type='number'
        placeholder={'int > 0'}
        defaultValue={moduleDescriptor?.armor}
      />

      <hr />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type='checkbox'
          checked={moduleDescriptor?.isElusive}
          placeholder={'(Optional) bool [default=false]. If true, MUST specify elusive data.'}
        />
        <h5>Is Elusive</h5>
      </div>

      <hr />

      {moduleDescriptor?.isElusive && (
        <>
          <h5>Elusive data</h5>
          <h6>Armor if blocked</h6>
          <input
            type='number'
            placeholder={'int > 0'}
            defaultValue={moduleDescriptor?.elusiveData.armorIfBlocked}
          />
        </>
      )}

      <hr />

      <h5>Fortification</h5>
      <input
        type='number'
        placeholder={'(Optional) Fortification::int [default=NotFortified(2)]. Enum value'}
        defaultValue={moduleDescriptor?.fortification}
      />

      <hr />

      <h5>XP gain</h5>
      <input
        type='number'
        placeholder={'int >= 0. How much XP gained when defeating the enemy in battle.'}
        defaultValue={moduleDescriptor?.elusiveData.xpGain}
      />

      <hr />

      <h5>Reputation gain</h5>
      <input
        type='number'
        placeholder={'(Optional) int >= 0 [default=0]. How much reputation gained when defeating the enemy in battle.'}
        defaultValue={moduleDescriptor?.reputationGain}
      />

      <hr />

      <h5>Reputation gain bonus when rampaging</h5>
      <input
        type='number'
        placeholder={'(Optional) int >= 0 [default=1]. How much additional reputation gained when defeating the enemy in battle when it is rampaging.'}
        defaultValue={moduleDescriptor?.reputationGainBonusWhenRampaging}
      />

      <hr />

      <h5>Challenge rating</h5>
      <input
        type='number'
        placeholder={'(Optional) int [1-10] [default=1]. How difficult is the enemy. Used for balancing when drawing randomly and for generating Battle Tale. Check the Wiki for example ratings.'}
        defaultValue={moduleDescriptor?.challengeRating}
      />

      <hr />

      <h5>Attacks</h5>
      {moduleDescriptor?.attacks.map((attack, index) => (
        <div key={index}>
          <hr />
          <p>Element: {attack.element}</p>
          <p>Attack type: {attack.attackType}</p>
          <p>Attack value: {attack.value}</p>
          <p>Attack modifiers:</p>
          {attack.attackModifiers.map((attackModifier, index) => (
            <div key={index}>
              <p>{attackModifier}</p>
            </div>
          ))}
        </div>
      ))}

      <hr />

      <h5>Summoning attacks</h5>
      {moduleDescriptor?.summoningAttacks.length === 0
        ? <p>No summoning attacks</p>
        : moduleDescriptor?.summoningAttacks.map((summoningAttack, index) => (
        <div key={index}>
          <hr />
          <p>{summoningAttack}</p>
        </div>
      ))}

      <hr />

      <h5>Immunities</h5>
      {moduleDescriptor?.immunities.length === 0
        ? <p>No immunities</p>
        : moduleDescriptor?.immunities.map((immunity, index) => (
        <div key={index}>
          <p>{immunity}</p>
        </div>
      ))}

      <hr />

      <h5>Resistances</h5>
      {moduleDescriptor?.resistances.length === 0
        ? <p>No resistances</p>
        : moduleDescriptor?.resistances.map((resistance, index) => (
        <div key={index}>
          <p>{resistance}</p>
        </div>
      ))}

      <hr />

      <div>
        <h5>Portrait sprite</h5>
        {portraitSprite && <img src={portraitSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Full body sprite</h5>
        {fullBodySprite && <img src={fullBodySprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Full body outline sprite</h5>
        {fullBodyOutlineSprite && <img src={fullBodyOutlineSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <h5>Tile data</h5>
      <hr />

      <h5>Tile sprite</h5>
      {tileNormalSprite && <img src={tileNormalSprite} width={256} height={384} />}
      <input type="file" accept="image/png" />

      <hr />

      <h5>Tile outlined sprite</h5>
      {tileOutlinedSprite && <img src={tileOutlinedSprite} width={256} height={384} />}
      <input type="file" accept="image/png" />
    </div>
  );
}
