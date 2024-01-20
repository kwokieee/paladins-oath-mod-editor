import { useState } from 'react';
import { Box } from '@mui/material';
import Module from './Module';

export default function ModuleGroup({ displayName, type, modNames }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Box sx={{ '&:hover': { cursor: 'pointer' } }}>
        <h4 style={{ textAlign: 'left' }} onClick={() => setIsExpanded(!isExpanded)}>
          {displayName}
        </h4>
      </Box>
      <Box>
        {isExpanded &&
          modNames.map((modName, index) => <Module name={modName} type={type} key={index} />)}
      </Box>
    </>
  );
}
