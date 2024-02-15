import { observer } from 'mobx-react-lite';
import { FindEnumByValue, GameValues } from '../../data/GameValues';
import { useState } from 'react';
import { useModuleStore } from '../../hooks/useModuleStore';

export const RewardPicker = observer(
  ({ selected, handleSubmit, canReferToModCreatedResources = false }) => {
    const [currentSelection, setCurrentSelection] = useState([...selected]);
    const moduleStore = useModuleStore();

    return (
      <div>
        <select
          multiple
          defaultValue={currentSelection.map((selectedReward) => selectedReward.value)}
          onChange={(e) => {
            const newSelection = Array.from(e.target.selectedOptions, (option) => option.value).map(
              (value) =>
                FindEnumByValue(GameValues.Reward, value) ||
                FindEnumByValue(moduleStore.getRewardsValuesDict(), value),
            );
            setCurrentSelection(newSelection);
            handleSubmit(newSelection);
          }}
        >
          {canReferToModCreatedResources && (
            <optgroup label="Mod-created rewards">
              {Object.values(moduleStore.getRewardsValuesDict()).map((reward) => (
                <option key={reward.value} value={reward.value}>
                  {reward.name}
                </option>
              ))}
            </optgroup>
          )}
          <optgroup label="Default available rewards">
            {Object.values(GameValues.Reward).map((reward) => (
              <option key={reward.value} value={reward.value}>
                {reward.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    );
  },
);
