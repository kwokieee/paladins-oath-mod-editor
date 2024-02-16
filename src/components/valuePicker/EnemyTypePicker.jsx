import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';

export const EnemyTypePicker = ({ selected, handleSubmit, isMultipleSelect = false }) => {
  if (isMultipleSelect) {
    const [currentSelection, setCurrentSelection] = useState([...selected]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <select
          multiple
          defaultValue={currentSelection.map((selectedType) => selectedType.value)}
          onChange={(e) => {
            const newSelection = Array.from(e.target.selectedOptions, (option) => option.value).map(
              (value) => FindEnumByValue(GameValues.EnemyType, value),
            );
            setCurrentSelection(newSelection);
            handleSubmit(newSelection);
          }}
        >
          {Object.values(GameValues.EnemyType).map((enemyType) => (
            <option key={enemyType.value} value={enemyType.value}>
              {enemyType.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <select
        defaultValue={selected.value}
        onChange={(e) => handleSubmit(FindEnumByValue(GameValues.EnemyType, e.target.value))}
      >
        {Object.values(GameValues.EnemyType).map((enemyType) => (
          <option key={enemyType.value} value={enemyType.value}>
            {enemyType.name}
          </option>
        ))}
      </select>
    </div>
  );
};
