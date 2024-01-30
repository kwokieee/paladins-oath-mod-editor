import { observer } from 'mobx-react-lite';
import { ValuePicker } from '../valuePicker/ValuePicker';

export const RewardsEditor = observer(({ moduleDescriptor }) => {
  const rewardData = moduleDescriptor?.data;
  if (!moduleDescriptor || !rewardData) {
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
        defaultValue={rewardData.guid}
      />

      <hr />

      <h5>Name</h5>
      <input
        type="text"
        placeholder={
          'string. Reward name (not localized) to be displayed when the rewards are distributed.'
        }
        defaultValue={rewardData.name}
        onChange={(e) => (rewardData.name = e.target.value)}
      />

      <hr />

      <h5>Combo type</h5>
      <p>Determines how the reward options are given to the player.</p>
      <ValuePicker
        valueType="RewardComboType"
        selected={rewardData.comboType}
        handleSubmit={(newRewardComboType) => (rewardData.comboType = newRewardComboType)}
      />

      <hr />

      <h5>Reward options</h5>
      {rewardData.rewardOptions.length === 0 ? (
        <p>No rewards selected</p>
      ) : (
        <div>
          <ValuePicker
            valueType="Reward"
            selected={rewardData.rewardOptions}
            handleSubmit={(newRewardOptions) => (rewardData.rewardOptions = newRewardOptions)}
          />
          {rewardData.rewardOptions.map((reward, index) => (
            <div key={index}>
              <hr />
              <p>{reward.name}</p>
            </div>
          ))}
        </div>
      )}

      <hr />
    </div>
  );
});
