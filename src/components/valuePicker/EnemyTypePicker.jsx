import { FindEnumByValue, GameValues } from '../../data/GameValues';

export const EnemyTypePicker = ({ selected, handleSubmit }) => {
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
