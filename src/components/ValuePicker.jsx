import { GameValues } from '../data/GameValues';

export default function ValuePicker({ valueType, selected, handleSubmit }) {
  if (valueType === 'Reward') {
    return (
      <div>
        {/* Multiselect */}
        <select multiple>
          {Object.values(GameValues.Reward).map((reward) => (
            <option
              key={reward.value}
              value={reward.value}
              selected={selected.some((selectedReward) => selectedReward.value === reward.value)}
            >
              {reward.name}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (valueType === 'RewardComboType') {
    return (
      <div>
        <select>
          {Object.values(GameValues.RewardComboType).map((rewardComboType) => (
            <option
              key={rewardComboType.value}
              value={rewardComboType.value}
              selected={selected.value === rewardComboType.value}
            >
              {rewardComboType.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
