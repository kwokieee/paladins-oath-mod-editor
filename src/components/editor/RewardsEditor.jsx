export default function RewardsEditor({ moduleDescriptor }) {
  return (
    <div>
      <h5>GUID</h5>
      <input
        type="text"
        placeholder={
          "string. guid, unique only within the mod. Will be turned into GUID 'mod:'+$yourModId+':'+$guid'"
        }
        defaultValue={moduleDescriptor?.guid}
      />

      <hr />

      <h5>Name</h5>
      <input
        type="text"
        placeholder={
          'string. Reward name (not localized) to be displayed when the rewards are distributed.'
        }
        defaultValue={moduleDescriptor?.name}
      />

      <hr />

      <h5>Combo type</h5>
      <input
        type="number"
        placeholder={
          '(Optional) int (AND=0 | OR=1) [default=AND(0)]. Determines how the reward options are given to the player.'
        }
        defaultValue={moduleDescriptor?.guid}
      />

      <hr />

      <h5>Reward options</h5>
      <input
        type="text"
        placeholder={'string. Enemy name (not localized)'}
        defaultValue={moduleDescriptor?.name}
      />
      {moduleDescriptor?.rewardOptions.length === 0 ? (
        <p>No rewards selected</p>
      ) : (
        moduleDescriptor?.rewardOptions.map((reward, index) => (
          <div key={index}>
            <hr />
            <p>{reward}</p>
          </div>
        ))
      )}

      <hr />
    </div>
  );
}
