import './ModuleGroup.css';
import { useState } from 'react';
import Module from './Module';

export default function ModuleGroup({ displayName, type, modNames }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="folder">
        <h4 style={{ textAlign: 'left' }} onClick={() => setIsExpanded(!isExpanded)}>
          {displayName}
        </h4>
      </div>
      <div>
        {isExpanded &&
          modNames.map((modName, index) => <Module name={modName} type={type} key={index} />)}
      </div>
    </>
  );
}
