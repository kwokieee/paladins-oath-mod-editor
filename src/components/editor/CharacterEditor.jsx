import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ResourcePicker } from '../resourcePicker/ResourcePicker';
import { ValuePicker } from '../valuePicker/ValuePicker';
import { Card } from '../resources/Card';
import { Blessing } from '../resources/Blessing';
import { getResourceWithCounts } from '../../utils';
import { Box, Button } from '@mui/material';

export const CharacterEditor = observer(({ moduleDescriptor }) => {
  const [isEditingInaneBlessings, setIsEditingInaneBlessings] = useState(false);
  const [isEditingInaneCards, setIsEditingInaneCards] = useState(false);
  const [isEditingUniqueCards, setIsEditingUniqueCards] = useState(false);
  const [isEditingPersonalOaths, setIsEditingPersonalOaths] = useState(false);

  const [portraitSprite, setPortraitSprite] = useState('');
  const [medallionSprite, setMedallionSprite] = useState('');
  const [figurineSprite, setFigurineSprite] = useState('');
  const [fullbodySprite, setFullbodySprite] = useState('');
  const [tileDefaultSprite, setTileDefaultSprite] = useState('');
  const [tileOccupiedSprite, setTileOccupiedSprite] = useState('');
  const [ownershipTokenMapPropSprite, setOwnershipTokenMapPropSprite] = useState('');

  const onEditInaneBlessings = () => {
    setIsEditingInaneBlessings(!isEditingInaneBlessings);
  };
  const onEditInaneCards = () => {
    setIsEditingInaneCards(!isEditingInaneCards);
  };
  const onEditUniqueCards = () => {
    setIsEditingUniqueCards(!isEditingUniqueCards);
  };
  const onEditPersonalOaths = () => {
    setIsEditingPersonalOaths(!isEditingPersonalOaths);
  };

  const characterData = moduleDescriptor?.data;
  if (!moduleDescriptor || !characterData) {
    return <>Invalid or corrupted data</>;
  }

  // const [inaneBlessings, setInaneBlessings] = useState(characterData.inaneBlessings);
  // const [inaneCards, setInaneCards] = useState(characterData.inaneCards);
  // const [uniqueCards, setUniqueCards] = useState(characterData.uniqueCardsInfo);

  // const selectedInaneCardsWithCounts = getResourceWithCounts(inaneCards);
  // const selectedUniqueCardsWithCounts = getResourceWithCounts(characterData.uniqueCardsInfo);

  return (
    <div>
      <h5>GUID</h5>
      <input
        type="text"
        placeholder={
          "string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid'"
        }
        defaultValue={characterData.guid}
      />

      <hr />

      <h5>Name</h5>
      <input
        type="text"
        placeholder={
          'string. Reward name (not localized) to be displayed when the rewards are distributed.'
        }
        defaultValue={characterData.name}
      />

      <hr />

      <h5>Description</h5>
      <input
        type="text"
        placeholder={'string. Backstory of the paladin.'}
        defaultValue={characterData.description}
      />

      <hr />

      <h5>Playstyle info</h5>
      <input
        type="text"
        placeholder={'string. flavor text describing what is good/bad at.'}
        defaultValue={characterData.playstyleInfo}
      />

      <hr />

      {/* <div>
        <h5>Portrait sprite</h5>
        {portraitSprite && <img src={portraitSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Medallion sprite</h5>
        {medallionSprite && <img src={medallionSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Figurine sprite</h5>
        {figurineSprite && <img src={figurineSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Full body sprite</h5>
        {fullbodySprite && <img src={fullbodySprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Tile default sprite</h5>
        {tileDefaultSprite && <img src={tileDefaultSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Tile occupied sprite</h5>
        {tileOccupiedSprite && <img src={tileOccupiedSprite} width={300} height={300} />}
        <input type="file" accept="image/png" />
      </div>

      <hr />

      <div>
        <h5>Ownership token map prop sprite</h5>
        {ownershipTokenMapPropSprite && (
          <img src={ownershipTokenMapPropSprite} width={300} height={300} />
        )}
        <input type="file" accept="image/png" />
      </div>

      <hr /> */}

      <div>
        <h5>Levels</h5>
        {characterData.levels.map(
          (level, index) =>
            level.requiredXp !== 0 && (
              <div key={index}>
                <hr />
                <p>XP required to reach this level: {level.requiredXp}</p>
                <p>
                  Rewards given on reaching this level:{' '}
                  {level?.rewardsLevelUp?.name ?? 'Invalid reward on level up'}
                </p>
              </div>
            ),
        )}
      </div>

      {/* <hr />

      <h5>Inane blessings:</h5>
      <Box>
        {inaneBlessings.length === 0 ? (
          <p>None</p>
        ) : (
          Object.values(inaneBlessings).map((blessingDetails) => (
            <Blessing
              key={blessingDetails.id}
              id={blessingDetails.id}
              name={blessingDetails.name}
              image={blessingDetails.image}
            />
          ))
        )}
      </Box>
      <Button style={{ marginBottom: 10 }} onClick={onEditInaneBlessings}>
        Edit
      </Button>
      {isEditingInaneBlessings && (
        <ResourcePicker
          resourceType={'Blessing'}
          selected={inaneBlessings}
          handleSubmit={(selectedInaneBlessings) => {
            setInaneBlessings(selectedInaneBlessings);
            characterData.inaneBlessings = selectedInaneBlessings;
            setIsEditingInaneBlessings(false);
          }}
          isEditing={isEditingInaneBlessings}
        />
      )}

      <hr />

      <h5>Inane cards:</h5>
      <Box>
        {inaneCards.length === 0 ? (
          <p>None</p>
        ) : (
          Object.values(selectedInaneCardsWithCounts).map((cardDetails) => (
            <Card
              key={cardDetails.id}
              id={cardDetails.id}
              name={cardDetails.name}
              image={cardDetails.image}
              count={cardDetails.count}
            />
          ))
        )}
      </Box>
      <Button style={{ marginBottom: 10 }} onClick={onEditInaneCards}>
        Edit
      </Button>
      {isEditingInaneCards && (
        <ResourcePicker
          resourceType={'Card'}
          selected={inaneCards}
          handleSubmit={(selectedInaneCards) => {
            setInaneCards(selectedInaneCards);
            characterData.inaneCards = selectedInaneCards;
            setIsEditingInaneCards(false);
          }}
          isEditing={isEditingInaneCards}
        />
      )}

      <hr />

      <h5>Unique inane cards:</h5>
      <Box>
        {uniqueCards.length === 0 ? (
          <p>None</p>
        ) : (
          Object.values(selectedUniqueCardsWithCounts).map((cardDetails) => (
            <Card
              key={cardDetails.id}
              id={cardDetails.id}
              name={cardDetails.name}
              image={cardDetails.image}
              count={cardDetails.count}
            />
          ))
        )}
      </Box>
      <Button style={{ marginBottom: 10 }} onClick={onEditUniqueCards}>
        Edit
      </Button>
      {isEditingUniqueCards && (
        <ResourcePicker
          resourceType={'Card'}
          selected={uniqueCards}
          handleSubmit={(selectedUniqueCards) => {
            setUniqueCards(selectedUniqueCards);
            characterData.uniqueCardsInfo = selectedUniqueCards;
            setIsEditingUniqueCards(false);
          }}
          isEditing={isEditingUniqueCards}
        />
      )}

      <hr /> */}

      <h5>Personal Oaths</h5>
      <div>
        <ValuePicker
          valueType="Oath"
          selected={characterData.personalOaths}
          handleSubmit={(newOaths) => (characterData.personalOaths = newOaths)}
        />
      </div>

      <hr />

      {/* <h5>Default allowed ambient die</h5>
      <input
        type="number"
        placeholder={'(Optional) int > 0 [default=1]. How many Ambient mana can the character use.'}
        defaultValue={characterData.defaultAllowedAmbientDie}
      />

      <hr />

      <h5>Number of points required to heal 1 wound</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int > 0 [default=1]. How many Healing points are required to heal 1 wound on this character.'
        }
        defaultValue={characterData.numPointsRequiredPerWound}
      />

      <hr />

      <h5>Default exploration distance</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int > 0 [default=1]. How many hexes away from exploration spot can the character explore.'
        }
        defaultValue={characterData.defaultExplorationDistance}
      />

      <hr />

      <h5>Default exploration movement cost</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int >= 0 [default=2]. How many movement points does it cost to explore (by default).'
        }
        defaultValue={characterData.defaultExplorationMovementCost}
      />

      <hr />

      <h5>Starting armor</h5>
      <input
        type="number"
        placeholder={'int > 0. How much armor does the character start with.'}
        defaultValue={characterData.starterArmor}
      />

      <hr />

      <h5>Starting hand size</h5>
      <input
        type="number"
        placeholder={'int > 0. How many cards can the character hold in hand by default.'}
        defaultValue={characterData.starterHandSize}
      />

      <hr />

      <h5>Starting follower slot count</h5>
      <input
        type="number"
        placeholder={'int >= 0. How many followers can the character manage from the start.'}
        defaultValue={characterData.starterFollowerSlotCount}
      />

      <hr />

      <h5>Starting reputation</h5>
      <input
        type="number"
        placeholder={'int [-7,+7]. Starting character reputation (0=neutral).'}
        defaultValue={characterData.starterReputation}
      />

      <hr />

      <h5>Dummy player starting boons</h5>
      <hr />

      <h6>Cards</h6>
      <p>
        {characterData.dummyPlayerStartingBoons.cards.length === 0
          ? 'None'
          : characterData.dummyPlayerStartingBoons.cards.map((card, index) => card.name).join(', ')}
      </p>

      <hr />

      <h6>Followers</h6>
      <p>
        {characterData.dummyPlayerStartingBoons.followers.length === 0
          ? 'None'
          : characterData.dummyPlayerStartingBoons.followers
              .map((follower, index) => follower.name)
              .join(', ')}
      </p>

      <hr />

      <h6>Blessings</h6>
      <p>
        {characterData.dummyPlayerStartingBoons.blessings.length === 0
          ? 'None'
          : characterData.dummyPlayerStartingBoons.blessings
              .map((blessing, index) => blessing.name)
              .join(', ')}
      </p>

      <hr />

      <h6>Crystals in inventory</h6>
      <p>
        {characterData.dummyPlayerStartingBoons.crystalsInInventory.length === 0
          ? 'None'
          : characterData.dummyPlayerStartingBoons.crystalsInInventory
              .map((crystal, index) => crystal.name)
              .join(', ')}
      </p>

      <hr />

      <h6>Armor bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character armor.'
        }
        defaultValue={characterData.dummyPlayerStartingBoons.armorBonus}
      />

      <hr />

      <h6>Hand size bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character hand size.'
        }
        defaultValue={characterData.dummyPlayerStartingBoons.handSizeBonus}
      />

      <hr />

      <h6>Reputation bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character reputation.'
        }
        defaultValue={characterData.dummyPlayerStartingBoons.handSizeBonus}
      />

      <hr />

      <h6>Follower slots bonus</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={characterData.dummyPlayerStartingBoons.handSizeBonus}
      />

      <hr />

      <h5>Starting boons</h5>
      <hr />

      <h6>Cards</h6>
      <p>
        {characterData.startingBoons.cards.length === 0
          ? 'None'
          : characterData.startingBoons.cards.map((card, index) => card.name).join(', ')}
      </p>

      <hr />

      <h6>Followers</h6>
      <p>
        {characterData.startingBoons.followers.length === 0
          ? 'None'
          : characterData.startingBoons.followers
              .map((follower, index) => follower.name)
              .join(', ')}
      </p>

      <hr />

      <h6>Blessings</h6>
      <p>
        {characterData.startingBoons.blessings.length === 0
          ? 'None'
          : characterData.startingBoons.blessings
              .map((blessing, index) => blessing.name)
              .join(', ')}
      </p>

      <hr />

      <h6>Crystals in inventory</h6>
      <p>
        {characterData.startingBoons.crystalsInInventory.length === 0
          ? 'None'
          : characterData.startingBoons.crystalsInInventory
              .map((crystal, index) => crystal.name)
              .join(', ')}
      </p>

      <hr />

      <h6>Armor bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character armor.'
        }
        defaultValue={characterData.startingBoons.armorBonus}
      />

      <hr />

      <h6>Hand size bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character hand size.'
        }
        defaultValue={characterData.startingBoons.handSizeBonus}
      />

      <hr />

      <h6>Reputation bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character reputation.'
        }
        defaultValue={characterData.startingBoons.handSizeBonus}
      />

      <hr />

      <h6>Follower slots bonus</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={characterData.startingBoons.handSizeBonus}
      />

      <hr />

      <h5>Round boons</h5>
      <hr />

      <h6>Mana</h6>
      <p>
        {characterData.roundBoons.mana.length === 0
          ? 'None'
          : characterData.roundBoons.mana
              .map((mana, index) => `Color: ${mana.color.name};Form: ${mana.form.name}`)
              .join(', ')}
      </p>

      <hr />

      <h6>Reputation bonus</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={characterData.roundBoons.reputationBonus}
      />

      <hr />

      <h6>Movement points</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={characterData.roundBoons.movementPoints}
      />

      <hr />

      <h6>Healing points</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={characterData.roundBoons.healingPoints}
      />

      <hr />

      <h6>Leadership points</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={characterData.roundBoons.leadershipPoints}
      />

      <hr /> */}
    </div>
  );
});
