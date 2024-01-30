import { FindEnumByValue, GameValues } from '../../data/GameValues';

export const FortificationPicker = ({ selected, handleSubmit }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <select
        defaultValue={selected.value}
        onChange={(e) =>
          handleSubmit(FindEnumByValue(GameValues.Fortification, Number(e.target.value)))
        }
      >
        {Object.values(GameValues.Fortification).map((fortification) => (
          <option key={fortification.value} value={fortification.value}>
            {fortification.name}
          </option>
        ))}
      </select>
    </div>
  );
};
