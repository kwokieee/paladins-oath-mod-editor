import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function Card({
  id,
  name,
  image,
  count,
  isModifiable = false,
  isCollapsed = false,
  isSelectable = false,
  handleClick,
  handleMultiplicityChange,
}) {
  useState(count);
  const handleDecreaseCount = () => {
    if (count === 1) return;
    handleMultiplicityChange(count - 1);
  };
  const handleIncreaseCount = () => {
    handleMultiplicityChange(count + 1);
  };

  if (isCollapsed) {
    return (
      <Box>
        <div title="Click to remove card">
          <Typography
            onClick={handleClick}
            textAlign={'center'}
            fontSize={10}
            sx={{ px: 1, '&:hover': { cursor: 'pointer' } }}
          >
            {name}
          </Typography>
        </div>
        {count ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {isModifiable && (
              <Button
                onClick={handleDecreaseCount}
                size="small"
                sx={{ px: 0 }}
                disabled={count <= 1}
              >
                {'-'}
              </Button>
            )}
            <Typography fontSize={10}>x{count}</Typography>
            {isModifiable && (
              <Button size="small" onClick={handleIncreaseCount}>
                {'+'}
              </Button>
            )}
          </Box>
        ) : null}
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
        width: 200,
        height: 330,
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
            className="cardImage"
            onClick={handleClick}
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            title={isSelectable ? 'Click to select card' : ''}
          />
        </Box>
        {count ? (
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {isModifiable && (
              <button onClick={handleDecreaseCount} disabled={count <= 1}>
                {'-'}
              </button>
            )}
            <p style={{ overflow: 'auto' }}>x{count}</p>
            {isModifiable && <button onClick={handleIncreaseCount}>{'+'}</button>}
          </div>
        ) : null}
      </div>
    </div>
  );
}
