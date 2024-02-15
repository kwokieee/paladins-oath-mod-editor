import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';

export const AttackModifierPicker = ({ selected, handleSubmit }) => {
  const [currentSelection, setCurrentSelection] = useState([...selected]);

  return (
    <div>
      <select
        multiple
        defaultValue={currentSelection.map(
          (selectedAttackModifier) => selectedAttackModifier.value,
        )}
        onChange={(e) => {
          const newSelection = Array.from(e.target.selectedOptions, (option) => option.value).map(
            (value) => FindEnumByValue(GameValues.AttackModifier, Number(value)),
          );
          setCurrentSelection(newSelection);
          handleSubmit(newSelection);
        }}
      >
        {Object.values(GameValues.AttackModifier)
          .filter((attackModifier) => attackModifier.value > 0)
          .map((attackModifier) => (
            <option key={attackModifier.value} value={attackModifier.value}>
              {attackModifier.name}
            </option>
          ))}
      </select>
    </div>
  );
};
