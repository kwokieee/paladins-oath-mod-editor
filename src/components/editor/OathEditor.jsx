import { observer } from 'mobx-react-lite';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import { ResourcePicker } from '../resourcePicker/ResourcePicker';
import { getResourceWithCounts } from '../../utils';
import { useState } from 'react';
import { Card } from '../resources/Card';
import { Follower } from '../resources/Follower';
import { Blessing } from '../resources/Blessing';

export const OathEditor = observer(({ moduleDescriptor }) => {
  const [isEditingStartingBoonCards, setIsEditingStartingBoonCards] = useState(false);
  const [isEditingStartingBoonFollowers, setIsEditingStartingBoonFollowers] = useState(false);
  const [isEditingStartingBoonBlessings, setIsEditingStartingBoonBlessings] = useState(false);

  const oathData = moduleDescriptor?.data;
  if (!moduleDescriptor || !oathData) {
    return <>Invalid or corrupted data</>;
  }

  const onEditStartingBoonCards = () => {
    setIsEditingStartingBoonCards(true);
  };
  const onEditStartingBoonFollowers = () => {
    setIsEditingStartingBoonFollowers(true);
  };
  const onEditStartingBoonBlessings = () => {
    setIsEditingStartingBoonBlessings(true);
  };
  const selectedStartingBoonCardsWithCounts = getResourceWithCounts(oathData?.startingBoons?.cards);
  const selectedStartingBoonFollowersWithCounts = getResourceWithCounts(
    oathData?.startingBoons?.followers,
  );

  return (
    <div>
      <h5>GUID</h5>
      <TextField
        placeholder={
          "string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid'"
        }
        value={oathData.guid}
        fullWidth
      />

      <hr />

      <h5>Name</h5>
      <TextField
        placeholder={'string. name displayed to the players'}
        value={oathData.name}
        onChange={(e) => (oathData.name = e.target.value)}
        fullWidth
      />

      <hr />

      <h5>Description</h5>
      <TextField
        placeholder="string. Flavor text describing the oath (stick to 2-3 lines max)."
        value={oathData.description}
        onChange={(e) => (oathData.description = e.target.value)}
        fullWidth
      />

      <hr />

      <h5>Starting boons</h5>
      <hr />

      <h6>Cards</h6>
      <Box>
        {oathData?.startingBoons?.cards?.length === 0 ? (
          <p>None</p>
        ) : (
          Object.values(selectedStartingBoonCardsWithCounts).map((cardDetails) => (
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
      <Button style={{ marginBottom: 10 }} onClick={onEditStartingBoonCards}>
        Edit
      </Button>
      {isEditingStartingBoonCards && (
        <ResourcePicker
          resourceType={'Card'}
          selected={oathData.startingBoons.cards}
          handleSubmit={(selectedCards) => {
            oathData.startingBoons.cards = selectedCards;
            setIsEditingStartingBoonCards(false);
          }}
          isEditing={isEditingStartingBoonCards}
        />
      )}

      <hr />

      <h6>Followers</h6>
      <Box>
        {oathData?.startingBoons?.followers?.length === 0 ? (
          <p>None</p>
        ) : (
          Object.values(selectedStartingBoonFollowersWithCounts).map((followerDetails) => (
            <Follower
              key={followerDetails.id}
              id={followerDetails.id}
              name={followerDetails.name}
              image={followerDetails.image}
              count={followerDetails.count}
            />
          ))
        )}
      </Box>
      <Button style={{ marginBottom: 10 }} onClick={onEditStartingBoonFollowers}>
        Edit
      </Button>
      {isEditingStartingBoonFollowers && (
        <ResourcePicker
          resourceType={'Follower'}
          selected={oathData.startingBoons.followers}
          handleSubmit={(selectedFollowers) => {
            oathData.startingBoons.followers = selectedFollowers;
            setIsEditingStartingBoonFollowers(false);
          }}
          isEditing={isEditingStartingBoonFollowers}
        />
      )}

      <hr />

      <h6>Blessings</h6>
      <Box>
        {oathData?.startingBoons?.blessings?.length === 0 ? (
          <p>None</p>
        ) : (
          Object.values(oathData.startingBoons.blessings).map((blessingDetails) => (
            <Blessing
              key={blessingDetails.id}
              id={blessingDetails.id}
              name={blessingDetails.name}
              image={blessingDetails.image}
            />
          ))
        )}
      </Box>
      <Button style={{ marginBottom: 10 }} onClick={onEditStartingBoonBlessings}>
        Edit
      </Button>
      {isEditingStartingBoonBlessings && (
        <ResourcePicker
          resourceType={'Blessing'}
          selected={oathData.startingBoons.blessings}
          handleSubmit={(selectedBlessings) => {
            oathData.startingBoons.blessings = selectedBlessings;
            setIsEditingStartingBoonBlessings(false);
          }}
          isEditing={isEditingStartingBoonBlessings}
        />
      )}

      <hr />

      <h6>Crystals in inventory</h6>
      <p>
        {oathData.startingBoons.crystalsInInventory.length === 0
          ? 'None'
          : oathData.startingBoons.crystalsInInventory
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
        defaultValue={oathData.startingBoons.armorBonus}
      />

      <hr />

      <h6>Hand size bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character hand size.'
        }
        defaultValue={oathData.startingBoons.handSizeBonus}
      />

      <hr />

      <h6>Reputation bonus</h6>
      <input
        type="number"
        placeholder={
          '(Optional) int [default=0]. Can be negative. Increase/Reduce character reputation.'
        }
        defaultValue={oathData.startingBoons.handSizeBonus}
      />

      <hr />

      <h6>Follower slots bonus</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={oathData.startingBoons.handSizeBonus}
      />

      <hr />

      <h5>Round boons</h5>
      <hr />

      <h6>Mana</h6>
      <p>
        {oathData.roundBoons.mana.length === 0
          ? 'None'
          : oathData.roundBoons.mana
              .map((mana, index) => `Color: ${mana.color.name}; Form: ${mana.form.name} `)
              .join(', ')}
      </p>

      <hr />

      <h6>Reputation bonus</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={oathData.roundBoons.reputationBonus}
      />

      <hr />

      <h6>Movement points</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={oathData.roundBoons.movementPoints}
      />

      <hr />

      <h6>Healing points</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={oathData.roundBoons.healingPoints}
      />

      <hr />

      <h6>Leadership points</h6>
      <input
        type="number"
        placeholder={
          "(Optional) int >= 0 [default=0]. Increase starting number of unit slots (will add the 'units' to it too)."
        }
        defaultValue={oathData.roundBoons.leadershipPoints}
      />

      <hr />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox
          checked={!!oathData.isCharacterSpecific}
          onChange={() => (oathData.isCharacterSpecific = !oathData.isCharacterSpecific)}
        />
        <h5>Is this oath character specific?</h5>
      </div>
    </div>
  );
});
