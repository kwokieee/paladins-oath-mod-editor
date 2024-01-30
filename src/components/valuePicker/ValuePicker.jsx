import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { EnemyTypePicker } from './EnemyTypePicker';
import { FortificationPicker } from './FortificationPicker';
import { RewardComboTypePicker } from './RewardComboTypePicker';
import { RewardPicker } from './RewardPicker';
import { ElementPicker } from './ElementPicker';
import { AttackTypePicker } from './AttackTypePicker';

export const ValuePicker = ({ valueType, selected, handleSubmit }) => {
  if (valueType === 'Reward') {
    return <RewardPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'RewardComboType') {
    return <RewardComboTypePicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'EnemyType') {
    return <EnemyTypePicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'Fortification') {
    return <FortificationPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'Element') {
    return <ElementPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'AttackType') {
    return <AttackTypePicker selected={selected} handleSubmit={handleSubmit} />;
  }
};
