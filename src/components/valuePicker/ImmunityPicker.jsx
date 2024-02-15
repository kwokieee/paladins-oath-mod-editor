import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';

export const ImmunityPicker = ({ selected, handleSubmit, isMultipleSelect = false }) => {
  if (isMultipleSelect) {
    const [currentSelection, setCurrentSelection] = useState([...selected]);

    return (
      <div>
        <select
          multiple
          defaultValue={currentSelection.map((selectedImmunity) => selectedImmunity.value)}
          onChange={(e) => {
            const newSelection = Array.from(e.target.selectedOptions, (option) => Number(option.value)).map(
              (value) => FindEnumByValue(GameValues.Immunity, value)
            );
            setCurrentSelection(newSelection);
            handleSubmit(newSelection);
          }}
        >
          {Object.values(GameValues.Immunity).map((immunity) => (
            <option key={immunity.value} value={immunity.value}>
              {immunity.name}
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
        onChange={(e) => handleSubmit(FindEnumByValue(GameValues.Immunity, Number(e.target.value)))}
      >
        {Object.values(GameValues.Immunity).map((immunity) => (
          <option key={immunity.value} value={immunity.value}>
            {immunity.name}
          </option>
        ))}
      </select>
    </div>
  );
};
