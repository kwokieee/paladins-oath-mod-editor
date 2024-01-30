import { FindEnumByValue, GameValues } from '../../data/GameValues';

export const RewardPicker = ({ selected, handleSubmit }) => {
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
};
