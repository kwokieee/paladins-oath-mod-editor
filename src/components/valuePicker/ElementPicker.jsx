import { FindEnumByValue, GameValues } from '../../data/GameValues';

export const ElementPicker = ({ selected, handleSubmit }) => {
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
