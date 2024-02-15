import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { EnemyTypePicker } from './EnemyTypePicker';
import { FortificationPicker } from './FortificationPicker';
import { RewardComboTypePicker } from './RewardComboTypePicker';
import { RewardPicker } from './RewardPicker';
import { ElementPicker } from './ElementPicker';
import { AttackTypePicker } from './AttackTypePicker';
import { AttackModifierPicker } from './AttackModifierPicker';
import { OathPicker } from './OathPicker';
import { ImmunityPicker } from './ImmunityPicker';

export const ValuePicker = ({ valueType, selected, isMultipleSelect, handleSubmit }) => {
  if (valueType === 'Reward') {
    return <RewardPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'RewardComboType') {
    return <RewardComboTypePicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'EnemyType') {
    return (
      <EnemyTypePicker
        selected={selected}
        isMultipleSelect={isMultipleSelect}
        handleSubmit={handleSubmit}
      />
    );
  } else if (valueType === 'Fortification') {
    return <FortificationPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'Element') {
    return (
      <ElementPicker
        selected={selected}
        isMultipleSelect={isMultipleSelect}
        handleSubmit={handleSubmit}
      />
    );
  } else if (valueType === 'AttackType') {
    return <AttackTypePicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'AttackModifier') {
    return <AttackModifierPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'Oath') {
    return <OathPicker selected={selected} handleSubmit={handleSubmit} />;
  } else if (valueType === 'Immunity') {
    return (
      <ImmunityPicker
        selected={selected}
        isMultipleSelect={isMultipleSelect}
        handleSubmit={handleSubmit}
      />
    );
  }
};
