import { useModInfo } from '../../hooks/useModInfo';
import { Box } from '@mui/material';

export default function Module({ name, type }) {
  const { switchSelectedModuleTo } = useModInfo();
  const onClickModule = () => {
    switchSelectedModuleTo(name, type);
  };

  return (
    <Box sx={{ '&:hover': { cursor: 'pointer' } }}>
      <p style={{ fontSize: 12, textAlign: 'left', marginLeft: 10 }} onClick={onClickModule}>
        {name}
      </p>
    </Box>
  );
}
