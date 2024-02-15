import { observer } from 'mobx-react-lite';
import { ValuePicker } from '../valuePicker/ValuePicker';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { useRef } from 'react';

export const EnemyEditor = observer(({ moduleDescriptor }) => {
  const portraitFileInput = useRef();
  const fullBodyFileInput = useRef();
  const fullBodyOutlineFileInput = useRef();
  const tileNormalFileInput = useRef();
  const tileOutlinedFileInput = useRef();

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
        <div key={attack.id}>
          <hr />
          <p>Element</p>
          <ValuePicker
            valueType={'Element'}
            selected={attack.element}
            handleSubmit={(newElement) => (attack.element = newElement)}
          />
          <p>Attack type</p>
          <ValuePicker
            valueType={'AttackType'}
            selected={attack.attackType}
            handleSubmit={(newAttackType) => (attack.attackType = newAttackType)}
          />
          <p>Attack value</p>
          <input
            type="number"
            placeholder='int > 0. Value of the attack.'
            defaultValue={attack.value}
            onChange={(e) => (attack.value = Number(e.target.value))}
          />
          <p>Attack modifier(s)</p>
          <ValuePicker
            valueType="AttackModifier"
            selected={attack.attackModifiers}
            handleSubmit={(newModifiers) => (attack.attackModifiers = newModifiers)}
          />
          <Button color="secondary" onClick={() => {enemyData.deleteAttack(index)}} sx={{ my: 2 }}>
            Delete attack
          </Button>
          <hr />
        </div>
      ))}
      <Button color="primary" onClick={() => {enemyData.addNewAttack()}} sx={{ my: 2 }}>
        Add new attack
      </Button>

      <hr />

      <h5>Summoning attacks</h5>
      <ValuePicker
        valueType={'EnemyType'}
        selected={enemyData.summoningAttacks}
        isMultipleSelect
        handleSubmit={(newEnemyTypes) => (enemyData.summoningAttacks = newEnemyTypes)}
      />

      <hr />

      <h5>Immunities</h5>
      <ValuePicker
        valueType={'Immunity'}
        selected={enemyData.immunities}
        isMultipleSelect
        handleSubmit={(newImmunities) => (enemyData.immunities = newImmunities)}
      />

      <hr />

      <h5>Resistances</h5>
      <ValuePicker
        valueType={'Element'}
        selected={enemyData.resistances}
        isMultipleSelect
        handleSubmit={(newElement) => (enemyData.resistances = newElement)}
      />

      <hr />

      <div>
        <h5>Portrait sprite</h5>
        {enemyData.portraitSprite && (
          <img src={enemyData.portraitSprite.getObjectUrl()} width={300} height={300} />
        )}
        <input
          type="file"
          accept="image/png"
          ref={portraitFileInput}
          style={{ display: 'none' }}
          onChange={(e) => (enemyData.portraitSprite.rawData = e.target.files[0])}
        />
        <Button color="primary" onClick={() => portraitFileInput.current.click()} sx={{ my: 2 }}>
          Upload image
        </Button>
      </div>

      <hr />

      <div>
        <h5>Full body sprite</h5>
        {enemyData.fullBodySprite && (
          <img src={enemyData.fullBodySprite.getObjectUrl()} width={300} height={300} />
        )}
        <input
          type="file"
          accept="image/png"
          ref={fullBodyFileInput}
          style={{ display: 'none' }}
          onChange={(e) => (enemyData.fullBodySprite.rawData = e.target.files[0])}
        />
        <Button color="primary" onClick={() => fullBodyFileInput.current.click()} sx={{ my: 2 }}>
          Upload image
        </Button>
      </div>
      <hr />

      <div>
        <h5>Full body outline sprite</h5>
        {enemyData.fullBodyOutlineSprite && (
          <img src={enemyData.fullBodyOutlineSprite.getObjectUrl()} width={300} height={300} />
        )}
        <input
          type="file"
          accept="image/png"
          ref={fullBodyOutlineFileInput}
          style={{ display: 'none' }}
          onChange={(e) => (enemyData.fullBodyOutlineSprite.rawData = e.target.files[0])}
        />
        <Button
          color="primary"
          onClick={() => fullBodyOutlineFileInput.current.click()}
          sx={{ my: 2 }}
        >
          Upload image
        </Button>
      </div>
      <hr />

      <h5>Tile data</h5>
      <hr />

      <h5>Tile sprite</h5>
      {enemyData.tileData.tileNormalSprite && (
        <img src={enemyData.tileData.tileNormalSprite.getObjectUrl()} width={256} height={384} />
      )}
      <input
        type="file"
        accept="image/png"
        ref={tileNormalFileInput}
        style={{ display: 'none' }}
        onChange={(e) => (enemyData.tileData.tileNormalSprite.rawData = e.target.files[0])}
      />
      <Button color="primary" onClick={() => tileNormalFileInput.current.click()} sx={{ my: 2 }}>
        Upload image
      </Button>

      <hr />

      <h5>Tile outlined sprite</h5>
      {enemyData.tileData.tileOutlinedSprite && (
        <img src={enemyData.tileData.tileOutlinedSprite.getObjectUrl()} width={256} height={384} />
      )}
      <input
        type="file"
        accept="image/png"
        ref={tileOutlinedFileInput}
        style={{ display: 'none' }}
        onChange={(e) => (enemyData.tileData.tileOutlinedSprite.rawData = e.target.files[0])}
      />
      <Button color="primary" onClick={() => tileOutlinedFileInput.current.click()} sx={{ my: 2 }}>
        Upload image
      </Button>
    </div>
  );
});
