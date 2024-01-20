import { Box, Button, Typography } from '@mui/material';
import './Card.css';
import { useState } from 'react';

export default function Card({
  id,
  name,
  image,
  count,
  modifiable = false,
  isCollapsed = false,
  handleClick,
  handleMultiplicityChange,
}) {
  useState(count);
  // Increases the count of the corresponding card in the parent state by 1
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
        <Typography fontSize={10}>{name}</Typography>
        {count ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {modifiable && (
              <Button onClick={handleDecreaseCount} disabled={count <= 1}>
                {'-'}
              </Button>
            )}
            <Typography fontSize={10}>x{count}</Typography>
            {modifiable && <Button onClick={handleIncreaseCount}>{'+'}</Button>}
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
        height: 290,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          className="cardImage"
          onClick={handleClick}
          src={image}
          alt={name}
          referrerPolicy="no-referrer"
        />
        {count ? (
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {modifiable && (
              <button onClick={handleDecreaseCount} disabled={count <= 1}>
                {'-'}
              </button>
            )}
            <p style={{ overflow: 'auto' }}>x{count}</p>
            {modifiable && <button onClick={handleIncreaseCount}>{'+'}</button>}
          </div>
        ) : null}
      </div>
    </div>
  );
}
