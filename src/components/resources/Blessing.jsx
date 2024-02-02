import { Box, Typography } from '@mui/material';

export const Blessing = ({
  id,
  name,
  image,
  isSelectable = false,
  isCollapsed = false,
  handleClick,
}) => {
  if (isCollapsed) {
    return (
      <Box
        title="Click to remove blessing"
        onClick={handleClick}
        sx={{ '&:hover': { cursor: 'pointer' } }}
      >
        <img src={image} alt={name} referrerPolicy="no-referrer" />
        <Typography textAlign={'center'} fontSize={10} sx={{ px: 1 }}>
          {name}
        </Typography>
      </Box>
    );
  }

  return (
    <div
      key={id}
      style={{
        display: 'inline-block',
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ '&:hover': { cursor: isSelectable ? 'pointer' : 'default' } }}>
          <img
            onClick={handleClick}
            src={image}
            alt={name}
            height={100}
            width={100}
            referrerPolicy="no-referrer"
            title={isSelectable ? 'Click to select blessing' : ''}
          />
          <Typography
            onClick={handleClick}
            textAlign={'center'}
            fontSize={10}
            sx={{ px: 1, '&:hover': { cursor: 'pointer' } }}
          >
            {name}
          </Typography>
        </Box>
      </div>
    </div>
  );
};
