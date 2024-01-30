import { useState } from 'react';
import { Box } from '@mui/material';
import Module from './Module';

export default function ModuleGroup({ displayName, type, moduleIds }) {
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
          moduleIds.map((moduleId, index) => <Module name={moduleId} type={type} key={index} />)}
      </Box>
    </>
  );
}
