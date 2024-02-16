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
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Module GUID:</Typography>
        <input
          type="text"
          placeholder={
            "string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid'"
          }
          defaultValue={enemyData.guid}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Module Name:</Typography>
        <input
          type="text"
          placeholder={'string. Enemy name (not localized)'}
          defaultValue={enemyData.name}
          onChange={(e) => (enemyData.name = e.target.value)}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Number of instances in deck:</Typography>
        <input
          type="number"
          placeholder="int >= 0 [default=1]. If > 0, the enemy will be added to draw piles."
          defaultValue={enemyData.numInstancesInDeck}
          onChange={(e) => (enemyData.numInstancesInDeck = Number(e.target.value))}
        />
      </Box>

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

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Armor:</Typography>
        <input
          type="number"
          placeholder={'int > 0'}
          defaultValue={enemyData.armor}
          onChange={(e) => (enemyData.armor = Number(e.target.value))}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Checkbox
          checked={!!enemyData.isElusive}
          onChange={() => (enemyData.isElusive = !enemyData.isElusive)}
        />
        <Typography>Is this enemy elusive?</Typography>
      </Box>

      {enemyData.isElusive && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ mr: 1 }}>Armor if blocked:</Typography>
          <input
            type="number"
            placeholder={'int > 0'}
            defaultValue={enemyData.elusiveData?.armorIfBlocked}
            onChange={(e) => (enemyData.elusiveData.armorIfBlocked = Number(e.target.value))}
          />
        </Box>
      )}

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Fortification:</Typography>
        <ValuePicker
          valueType={'Fortification'}
          selected={enemyData.fortification}
          handleSubmit={(newFortification) => (enemyData.fortification = newFortification)}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>XP Gain:</Typography>
        <input
          type="number"
          placeholder={'int >= 0. How much XP gained when defeating the enemy in battle.'}
          defaultValue={enemyData.xpGain}
          onChange={(e) => (enemyData.xpGain = Number(e.target.value))}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Reputation Gain:</Typography>
        <input
          type="number"
          placeholder={
            '(Optional) int >= 0 [default=0]. How much reputation gained when defeating the enemy in battle.'
          }
          defaultValue={enemyData.reputationGain}
          onChange={(e) => (enemyData.reputationGain = Number(e.target.value))}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Reputation gain bonus when rampaging:</Typography>
        <input
          type="number"
          placeholder={
            '(Optional) int >= 0 [default=1]. How much additional reputation gained when defeating the enemy in battle when it is rampaging.'
          }
          defaultValue={enemyData.reputationGainBonusWhenRampaging}
          onChange={(e) => (enemyData.reputationGainBonusWhenRampaging = Number(e.target.value))}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Challenge rating:</Typography>
        <input
          type="number"
          placeholder={
            '(Optional) int [1-10] [default=1]. How difficult is the enemy. Used for balancing when drawing randomly and for generating Battle Tale. Check the Wiki for example ratings.'
          }
          defaultValue={enemyData.challengeRating}
          onChange={(e) => (enemyData.challengeRating = Number(e.target.value))}
        />
      </Box>

      <hr />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Attacks
      </Typography>
      {enemyData.attacks.map((attack, index) => (
        <div key={attack.id}>
          <hr />
          <Typography sx={{ textDecoration: 'underline' }}>{`Attack ${index + 1}`}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>Element:</Typography>
            <ValuePicker
              valueType={'Element'}
              selected={attack.element}
              handleSubmit={(newElement) => (attack.element = newElement)}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>Attack type:</Typography>
            <ValuePicker
              valueType={'AttackType'}
              selected={attack.attackType}
              handleSubmit={(newAttackType) => (attack.attackType = newAttackType)}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>Attack value:</Typography>
            <input
              type="number"
              placeholder="int > 0. Value of the attack."
              defaultValue={attack.value}
              onChange={(e) => (attack.value = Number(e.target.value))}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>Attack modifiers:</Typography>
            <ValuePicker
              valueType="AttackModifier"
              selected={attack.attackModifiers}
              handleSubmit={(newModifiers) => (attack.attackModifiers = newModifiers)}
            />
          </Box>
          <Button
            color="secondary"
            onClick={() => {
              enemyData.deleteAttack(index);
            }}
            sx={{ my: 2 }}
          >
            Delete attack
          </Button>
        </div>
      ))}
      <Button
        color="primary"
        onClick={() => {
          enemyData.addNewAttack();
        }}
        sx={{ my: 2 }}
      >
        Add new attack
      </Button>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Summoning attacks:</Typography>
        <ValuePicker
          valueType={'EnemyType'}
          selected={enemyData.summoningAttacks}
          isMultipleSelect
          handleSubmit={(newEnemyTypes) => (enemyData.summoningAttacks = newEnemyTypes)}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Immunities:</Typography>
        <ValuePicker
          valueType={'Immunity'}
          selected={enemyData.immunities}
          isMultipleSelect
          handleSubmit={(newImmunities) => (enemyData.immunities = newImmunities)}
        />
      </Box>

      <hr />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mr: 1 }}>Resistances:</Typography>
        <ValuePicker
          valueType={'Element'}
          selected={enemyData.resistances}
          isMultipleSelect
          handleSubmit={(newElement) => (enemyData.resistances = newElement)}
        />
      </Box>

      <hr />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textDecoration: 'underline', mb: 2 }}>Portrait sprite</Typography>
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
      </Box>

      <hr />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textDecoration: 'underline', mb: 2 }}>Full body sprite</Typography>
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
      </Box>

      <hr />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textDecoration: 'underline', mb: 2 }}>
          Full body outline sprite
        </Typography>
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
      </Box>

      <hr />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textDecoration: 'underline', mb: 2 }}>Tile sprite</Typography>
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
      </Box>

      <hr />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textDecoration: 'underline', mb: 2 }}>Tile outlined sprite</Typography>
        {enemyData.tileData.tileOutlinedSprite && (
          <img
            src={enemyData.tileData.tileOutlinedSprite.getObjectUrl()}
            width={256}
            height={384}
          />
        )}
        <input
          type="file"
          accept="image/png"
          ref={tileOutlinedFileInput}
          style={{ display: 'none' }}
          onChange={(e) => (enemyData.tileData.tileOutlinedSprite.rawData = e.target.files[0])}
        />
        <Button
          color="primary"
          onClick={() => tileOutlinedFileInput.current.click()}
          sx={{ my: 2 }}
        >
          Upload image
        </Button>
      </Box>
    </Box>
  );
});
