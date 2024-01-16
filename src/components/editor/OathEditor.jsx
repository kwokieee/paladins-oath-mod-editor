import { OathData } from '../../data/classes/OathData';

export default function OathEditor({ moduleDescriptor }) {
  if (!moduleDescriptor) {
    return <>Loading...</>;
  }

  const oathData = OathData.FromJson(moduleDescriptor);
  if (!oathData) {
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
        defaultValue={oathData.guid}
      />

      <hr />

      <h5>Name</h5>
      <input
        type="text"
        placeholder={'string. name displayed to the players'}
        defaultValue={oathData.name}
      />

      <hr />

      <h5>Description</h5>
      <input
        type="text"
        placeholder={'string. Flavor text describing the oath (stick to 2-3 lines max).'}
        defaultValue={oathData.description}
      />

      <hr />

      <h5>Starting boons</h5>
      <hr />

      <h6>Cards</h6>
      <p>
        {oathData.startingBoons.cards.length === 0
          ? 'None'
          : oathData.startingBoons.cards.map((card, index) => card.name).join(', ')}
      </p>

      <hr />

      <h6>Followers</h6>
      <p>
        {oathData.startingBoons.followers.length === 0
          ? 'None'
          : oathData.startingBoons.followers.map((follower, index) => follower.name).join(', ')}
      </p>

      <hr />

      <h6>Blessings</h6>
      <p>
        {oathData.startingBoons.blessings.length === 0
          ? 'None'
          : oathData.startingBoons.blessings.map((blessing, index) => blessing.name).join(', ')}
      </p>

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
        <input
          type="checkbox"
          checked={oathData.isCharacterSpecific}
          placeholder={
            '(Optional) bool [default=false]. Set to true if the oath can only be used by a specific character (that character data should include it).'
          }
        />
        <h5>Is character specific</h5>
      </div>
    </div>
  );
}
