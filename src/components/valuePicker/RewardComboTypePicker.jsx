import { FindEnumByValue, GameValues } from '../../data/GameValues';

export const RewardComboTypePicker = ({ selected, handleSubmit }) => {
  return (
    <div>
      <select
        defaultValue={selected.value}
        onChange={(e) => handleSubmit(FindEnumByValue(GameValues.RewardComboType, e.target.value))}
      >
        {Object.values(GameValues.RewardComboType).map((rewardComboType) => (
          <option key={rewardComboType.value} value={rewardComboType.value}>
            {rewardComboType.name}
          </option>
        ))}
      </select>
    </div>
  );
};
