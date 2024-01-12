import { useEffect } from 'react';
import {RewardData} from '../../data/classes/RewardData';

export default function RewardsEditor({ moduleDescriptor }) {
    useEffect(() => {
      console.log(moduleDescriptor);
    }, [moduleDescriptor]);
  
    if( ! moduleDescriptor ){
      return <>Loading...</>;
    }
  
    const rewardData = RewardData.fromJson(moduleDescriptor);
    if( ! rewardData ){
      return <>Invalid or corrupted data</>;
    }
  
  return (
    <>
      <div>
        <div>
          <h5>guid</h5>
          <p>{rewardData.guid}</p>
          <h5>Name</h5>
          <p>{rewardData.name}</p>
          <h5>Combo Type</h5>
          <p>{rewardData.comboType.name}</p>
          <h5>Reward Options</h5>
          {rewardData.rewardOptions.map((reward, idx) => (
            <>{reward.name}</>
          ))}
        </div>
      </div>
    </>
  );
}
