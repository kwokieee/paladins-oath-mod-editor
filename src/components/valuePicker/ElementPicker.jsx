import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';

export const ElementPicker = ({ selected, handleSubmit, isMultipleSelect = false }) => {
  if (isMultipleSelect) {
    const [currentSelection, setCurrentSelection] = useState([...selected]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <select
          multiple
          defaultValue={currentSelection.map((selectedElement) => selectedElement.value)}
          onChange={(e) => {
            const newSelection = Array.from(e.target.selectedOptions, (option) => option.value).map(
              (value) => FindEnumByValue(GameValues.Element, value),
            );
            setCurrentSelection(newSelection);
            handleSubmit(newSelection);
          }}
        >
          {Object.values(GameValues.Element).map((element) => (
            <option key={element.value} value={element.value}>
              {element.name}
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
        onChange={(e) => handleSubmit(FindEnumByValue(GameValues.Element, e.target.value))}
      >
        {Object.values(GameValues.Element).map((element) => (
          <option key={element.value} value={element.value}>
            {element.name}
          </option>
        ))}
      </select>
    </div>
  );
};
