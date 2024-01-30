import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';

export const RewardPicker = ({ selected, handleSubmit }) => {
  const [currentSelection, setCurrentSelection] = useState([...selected]);

  return (
    <div>
      {/* Multiselect */}
      <select
        multiple
        defaultValue={currentSelection.map((selectedReward) => selectedReward.value)}
        onChange={(e) => {
          const newSelection = Array.from(e.target.selectedOptions, (option) => option.value).map(
            (value) => FindEnumByValue(GameValues.Reward, value),
          );
          setCurrentSelection(newSelection);
          handleSubmit(newSelection);
        }}
      >
        {Object.values(GameValues.Reward).map((reward) => (
          <option key={reward.value} value={reward.value}>
            {reward.name}
          </option>
        ))}
      </select>
    </div>
  );
};
