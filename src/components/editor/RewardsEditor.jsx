import { RewardData } from '../../data/classes/RewardData';
import ValuePicker from '../ValuePicker';

export default function RewardsEditor({ moduleDescriptor }) {
  if (!moduleDescriptor) {
    return <>Loading...</>;
  }

  const rewardData = RewardData.FromJson(moduleDescriptor);

  if (!rewardData) {
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
      />

      <hr />

      <h5>Combo type</h5>
      <p>Determines how the reward options are given to the player.</p>
      <ValuePicker valueType="RewardComboType" selected={rewardData.comboType} />

      <hr />

      <h5>Reward options</h5>
      {/* Multiselect */}
      {rewardData.rewardOptions.length === 0 ? (
        <p>No rewards selected</p>
      ) : (
        <div>
          {rewardData.rewardOptions.map((reward, index) => (
            <div key={index}>
              <hr />
              <p>{reward.name}</p>
            </div>
          ))}
          <ValuePicker valueType="Reward" selected={rewardData.rewardOptions} />
        </div>
      )}

      <hr />
    </div>
  );
}
