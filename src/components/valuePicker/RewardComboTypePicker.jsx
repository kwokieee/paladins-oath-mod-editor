export const RewardComboTypePicker = ({ selected, handleSubmit }) => {
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
};
