import { useModuleStore } from '../../hooks/useModuleStore';
import { Box } from '@mui/material';

export default function Module({ name, type }) {
  const moduleStore = useModuleStore();
  const onClickModule = () => {
    moduleStore.changeSelectedModuleTo(type, name);
  };

  return (
    <Box sx={{ '&:hover': { cursor: 'pointer' } }}>
      <p style={{ fontSize: 12, textAlign: 'left', marginLeft: 10 }} onClick={onClickModule}>
        {name}
      </p>
    </Box>
  );
}
