import { FindEnumByValue, GameValues } from '../../data/GameValues';

export const AttackTypePicker = ({ selected, handleSubmit }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <select
        defaultValue={selected.value}
        onChange={(e) => handleSubmit(FindEnumByValue(GameValues.AttackType, e.target.value))}
      >
        {Object.values(GameValues.AttackType).map((attackType) => (
          <option key={attackType.value} value={attackType.value}>
            {attackType.name}
          </option>
        ))}
      </select>
    </div>
  );
};
