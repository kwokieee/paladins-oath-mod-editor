import { observer } from 'mobx-react-lite';
import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';
import { useModuleStore } from '../../hooks/useModuleStore';

export const OathPicker = observer(({ selected, handleSubmit }) => {
  const [currentSelection, setCurrentSelection] = useState([...selected]);
  const moduleStore = useModuleStore();

  return (
    <div>
      <select
        multiple
        defaultValue={currentSelection.map((selectedOath) => selectedOath.value)}
        onChange={(e) => {
          const newSelection = Array.from(e.target.selectedOptions, (option) => option.value).map(
            (value) => FindEnumByValue(GameValues.Oath, value) || FindEnumByValue(moduleStore.getOathValuesDict(), value),
          );
          setCurrentSelection(newSelection);
          handleSubmit(newSelection);
        }}
      >
        <optgroup label="Mod-created oaths">
          {Object.values(moduleStore.getOathValuesDict()).map((oath) => (
            <option key={oath.value} value={oath.value}>
              {oath.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Default available oaths">
          {Object.values(GameValues.Oath).map((oath) => (
            <option key={oath.value} value={oath.value}>
              {oath.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
});