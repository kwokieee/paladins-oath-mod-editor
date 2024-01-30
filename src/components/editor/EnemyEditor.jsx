import { observer } from 'mobx-react-lite';
import { ValuePicker } from '../valuePicker/ValuePicker';
import { Box, Checkbox, Typography } from '@mui/material';

export const EnemyEditor = observer(({ moduleDescriptor }) => {
  const handleFileSelected = (e) => {
    const imageFile = e.target.files[0];
    console.log(imageFile);
  };

  const enemyData = moduleDescriptor?.data;
  if (!moduleDescriptor || !enemyData) {
    return <>Invalid or corrupted data</>;
  }

  return (
    <div>
      <h5>GUID</h5>
      <input
        type="text"
        placeholder={
          "string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid'"
        }
        defaultValue={enemyData.guid}
      />

      <hr />

      <h5>Name</h5>
      <input
        type="text"
        placeholder={'string. Enemy name (not localized)'}
        defaultValue={enemyData.name}
        onChange={(e) => (enemyData.name = e.target.value)}
      />

      <hr />

      <h5>Number of instances in deck</h5>
      <input
        type="number"
        placeholder="int >= 0 [default=1]. If > 0, the enemy will be added to draw piles."
        defaultValue={enemyData.numInstancesInDeck}
        onChange={(e) => (enemyData.numInstancesInDeck = Number(e.target.value))}
      />

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Enemy type:</Typography>
        <ValuePicker
          valueType={'EnemyType'}
          selected={enemyData.enemyType}
          handleSubmit={(newEnemyType) => (enemyData.enemyType = newEnemyType)}
        />
      </Box>

      <hr />

      <h5>Armor</h5>
      <input
        type="number"
        placeholder={'int > 0'}
        defaultValue={enemyData.armor}
        onChange={(e) => (enemyData.armor = Number(e.target.value))}
      />

      <hr />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox
          checked={!!enemyData.isElusive}
          onChange={() => (enemyData.isElusive = !enemyData.isElusive)}
        />
        <h5>Is this enemy elusive?</h5>
      </div>

      <hr />

      {enemyData.isElusive && (
        <>
          <h5>Elusive data</h5>
          <h6>Armor if blocked</h6>
          <input
            type="number"
            placeholder={'int > 0'}
            defaultValue={enemyData.elusiveData?.armorIfBlocked}
            onChange={(e) => (enemyData.elusiveData.armorIfBlocked = Number(e.target.value))}
          />
          <hr />
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Fortification:</Typography>
        <ValuePicker
          valueType={'Fortification'}
          selected={enemyData.fortification}
          handleSubmit={(newFortification) => (enemyData.fortification = newFortification)}
        />
      </Box>

      <hr />

      <h5>XP gain</h5>
      <input
        type="number"
        placeholder={'int >= 0. How much XP gained when defeating the enemy in battle.'}
        defaultValue={enemyData.xpGain}
        onChange={(e) => (enemyData.xpGain = Number(e.target.value))}
      />

      <hr />

      <h5>Reputation gain</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int >= 0 [default=0]. How much reputation gained when defeating the enemy in battle.'
        }
        defaultValue={enemyData.reputationGain}
        onChange={(e) => (enemyData.reputationGain = Number(e.target.value))}
      />

      <hr />

      <h5>Reputation gain bonus when rampaging</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int >= 0 [default=1]. How much additional reputation gained when defeating the enemy in battle when it is rampaging.'
        }
        defaultValue={enemyData.reputationGainBonusWhenRampaging}
        onChange={(e) => (enemyData.reputationGainBonusWhenRampaging = Number(e.target.value))}
      />

      <hr />

      <h5>Challenge rating</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int [1-10] [default=1]. How difficult is the enemy. Used for balancing when drawing randomly and for generating Battle Tale. Check the Wiki for example ratings.'
        }
        defaultValue={enemyData.challengeRating}
        onChange={(e) => (enemyData.challengeRating = Number(e.target.value))}
      />

      <hr />

      <h5>Attacks</h5>
      {enemyData.attacks.map((attack, index) => (
        <div key={index}>
          <hr />
          <p>Element: {attack.element.name}</p>
          <p>Attack type: {attack.attackType.name}</p>
          <p>Attack value: {attack.value}</p>
          <p>
            Attack modifier(s):{' '}
            {attack.attackModifiers.map((attackModifier) => attackModifier.name).join(',')}
          </p>
        </div>
      ))}

      <hr />

      <h5>Summoning attacks</h5>
      {enemyData.summoningAttacks.length === 0 ? (
        <p>No summoning attacks</p>
      ) : (
        enemyData.summoningAttacks.map((summoningAttack, index) => (
          <div key={index}>
            <hr />
            <p>{summoningAttack.name}</p>
          </div>
        ))
      )}
      <ValuePicker
        valueType={'EnemyType'}
        selected={enemyData.enemyType}
        handleSubmit={(newEnemyType) => (enemyData.enemyType = newEnemyType)}
      />

      <hr />

      <h5>Immunities</h5>
      {enemyData.immunities.length === 0 ? (
        <p>No immunities</p>
      ) : (
        enemyData.immunities.map((immunity, index) => (
          <div key={index}>
            <p>{immunity.name}</p>
          </div>
        ))
      )}

      <hr />

      <h5>Resistances</h5>
      {enemyData.resistances.length === 0 ? (
        <p>No resistances</p>
      ) : (
        enemyData.resistances.map((resistance, index) => (
          <div key={index}>
            <p>{resistance.name}</p>
          </div>
        ))
      )}

      <hr />

      {/* <div>
        <h5>Portrait sprite</h5>
        {portraitSprite && <img src={portraitSprite} width={300} height={300} />}
        <input type="file" accept="image/png" onChange={handleFileSelected} />
      </div>

      <hr />

      <div>
        <h5>Full body sprite</h5>
        {fullBodySprite && <img src={fullBodySprite} width={300} height={300} />}
        <input type="file" accept="image/png" onChange={handleFileSelected} />
      </div>

      <hr />

      <div>
        <h5>Full body outline sprite</h5>
        {fullBodyOutlineSprite && <img src={fullBodyOutlineSprite} width={300} height={300} />}
        <input type="file" accept="image/png" onChange={handleFileSelected} />
      </div>

      <hr />

      <h5>Tile data</h5>
      <hr />

      <h5>Tile sprite</h5>
      {tileNormalSprite && <img src={tileNormalSprite} width={256} height={384} />}
      <input type="file" accept="image/png" onChange={handleFileSelected} />

      <hr />

      <h5>Tile outlined sprite</h5>
      {tileOutlinedSprite && <img src={tileOutlinedSprite} width={256} height={384} />}
      <input type="file" accept="image/png" onChange={handleFileSelected} /> */}
    </div>
  );
});
